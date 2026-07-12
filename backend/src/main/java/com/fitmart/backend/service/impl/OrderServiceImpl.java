package com.fitmart.backend.service.impl;

import com.fitmart.backend.dto.request.PlaceOrderRequest;
import com.fitmart.backend.dto.response.OrderResponse;
import com.fitmart.backend.entity.*;
import com.fitmart.backend.enums.InventoryType;
import com.fitmart.backend.enums.OrderStatus;
import com.fitmart.backend.exception.BadRequestException;
import com.fitmart.backend.exception.ResourceNotFoundException;
import com.fitmart.backend.repository.*;
import com.fitmart.backend.service.OrderService;
import com.fitmart.backend.util.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final InventoryTransactionRepository inventoryRepository;

    @Override
    public OrderResponse placeOrder(String email, PlaceOrderRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        BigDecimal total = cart.getItems()
                .stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = Order.builder()
                .user(user)
                .status(OrderStatus.PENDING)
                .totalAmount(total)
                .build();

        order = orderRepository.save(order);

        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem item : cart.getItems()) {

            Product product = item.getProduct();

            if (product.getStockQuantity() < item.getQuantity()) {
                throw new BadRequestException(
                        product.getName() + " is out of stock");
            }

            product.setStockQuantity(
                    product.getStockQuantity() - item.getQuantity());

            productRepository.save(product);

            InventoryTransaction transaction =
                    InventoryTransaction.builder()
                            .product(product)
                            .quantityChange(-item.getQuantity())
                            .type(InventoryType.ORDER)
                            .reason("Order Placed")
                            .build();

            inventoryRepository.save(transaction);

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(item.getQuantity())
                    .price(product.getPrice())
                    .totalPrice(item.getTotalPrice())
                    .build();

            orderItems.add(orderItem);
        }

        orderItemRepository.saveAll(orderItems);

        order.setOrderItems(orderItems);

        cart.getItems().clear();

        cartRepository.save(cart);

        return OrderMapper.toResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return orderRepository.findByUser(user)
                .stream()
                .map(OrderMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(String email, Long orderId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("You cannot access this order");
        }

        return OrderMapper.toResponse(order);
    }

    @Override
public OrderResponse updateStatus(Long orderId, OrderStatus status) {

    Order order = orderRepository.findById(orderId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Order not found"));

    if (order.getStatus() != OrderStatus.DELIVERED
            && status == OrderStatus.DELIVERED) {

        User user = order.getUser();

        user.setTotalOrders(user.getTotalOrders() + 1);

        user.setTotalSpent(
                user.getTotalSpent().add(order.getTotalAmount())
        );

        userRepository.save(user);

        for (OrderItem item : order.getOrderItems()) {

            Product product = item.getProduct();

            product.setSoldQuantity(
                    product.getSoldQuantity() + item.getQuantity()
            );

            productRepository.save(product);
        }
    }

    order.setStatus(status);

    orderRepository.save(order);

    return OrderMapper.toResponse(order);
}

    @Override
    public void deleteOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        orderRepository.delete(order);
    }
}