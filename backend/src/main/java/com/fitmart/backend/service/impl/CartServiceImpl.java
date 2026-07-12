package com.fitmart.backend.service.impl;

import com.fitmart.backend.dto.request.AddToCartRequest;
import com.fitmart.backend.dto.request.UpdateCartRequest;
import com.fitmart.backend.dto.response.CartResponse;
import com.fitmart.backend.entity.*;
import com.fitmart.backend.exception.ResourceNotFoundException;
import com.fitmart.backend.repository.*;
import com.fitmart.backend.service.CartService;
import com.fitmart.backend.util.CartMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    @Override
    public CartResponse addToCart(String email,
                                  AddToCartRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {

                    Cart newCart = Cart.builder()
                            .user(user)
                            .build();

                    return cartRepository.save(newCart);

                });

        CartItem cartItem = cartItemRepository
                .findByCartAndProduct(cart, product)
                .orElse(null);

        if (cartItem == null) {

            cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .totalPrice(
                            product.getPrice()
                                    .multiply(BigDecimal.valueOf(request.getQuantity()))
                    )
                    .build();

            cart.getItems().add(cartItem);

        } else {

            cartItem.setQuantity(
                    cartItem.getQuantity() + request.getQuantity());

            cartItem.setTotalPrice(
                    product.getPrice()
                            .multiply(BigDecimal.valueOf(cartItem.getQuantity()))
            );
        }

        cartRepository.save(cart);

        return CartMapper.toResponse(cart);

    }

    @Override
    public CartResponse updateQuantity(String email,
                                       Long cartItemId,
                                       UpdateCartRequest request) {

        Cart cart = getUserCart(email);

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart item not found"));

        item.setQuantity(request.getQuantity());

        item.setTotalPrice(
                item.getProduct()
                        .getPrice()
                        .multiply(BigDecimal.valueOf(request.getQuantity()))
        );

        cartItemRepository.save(item);

        return CartMapper.toResponse(cart);

    }

    @Override
    public CartResponse removeItem(String email,
                                   Long cartItemId) {

        Cart cart = getUserCart(email);

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart item not found"));

        cart.getItems().remove(item);

        cartItemRepository.delete(item);

        return CartMapper.toResponse(cart);

    }

    @Override
    public CartResponse clearCart(String email) {

        Cart cart = getUserCart(email);

        cart.getItems().clear();

        cartRepository.save(cart);

        return CartMapper.toResponse(cart);

    }

    @Override
    @Transactional(readOnly = true)
    public CartResponse getCart(String email) {

        return CartMapper.toResponse(getUserCart(email));

    }

    private Cart getUserCart(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart not found"));

    }

}