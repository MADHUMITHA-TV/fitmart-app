package com.fitmart.backend.service.impl;

import com.fitmart.backend.dto.response.WishlistResponse;
import com.fitmart.backend.entity.Product;
import com.fitmart.backend.entity.User;
import com.fitmart.backend.entity.Wishlist;
import com.fitmart.backend.entity.WishlistItem;
import com.fitmart.backend.exception.BadRequestException;
import com.fitmart.backend.exception.ResourceNotFoundException;
import com.fitmart.backend.repository.ProductRepository;
import com.fitmart.backend.repository.UserRepository;
import com.fitmart.backend.repository.WishlistItemRepository;
import com.fitmart.backend.repository.WishlistRepository;
import com.fitmart.backend.service.WishlistService;
import com.fitmart.backend.util.WishlistMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Transactional
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public WishlistResponse addProduct(
            String email,
            Long productId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        Wishlist wishlist = wishlistRepository.findByUser(user)
                .orElseGet(() -> {
                    Wishlist newWishlist = Wishlist.builder()
                            .user(user)
                            .items(new ArrayList<>())
                            .build();

                    return wishlistRepository.save(newWishlist);
                });

        if (wishlistItemRepository
                .findByWishlistAndProduct(wishlist, product)
                .isPresent()) {

            throw new BadRequestException(
                    "Product already exists in wishlist");
        }

        WishlistItem item = WishlistItem.builder()
                .wishlist(wishlist)
                .product(product)
                .build();

        wishlist.getItems().add(item);

        wishlistItemRepository.save(item);

        return WishlistMapper.toResponse(wishlist);
    }

    @Override
public WishlistResponse getWishlist(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new ResourceNotFoundException("User not found"));

    Wishlist wishlist = wishlistRepository.findByUser(user)
            .orElseGet(() -> {

                Wishlist newWishlist = Wishlist.builder()
                        .user(user)
                        .items(new ArrayList<>())
                        .build();

                return wishlistRepository.save(newWishlist);
            });

    return WishlistMapper.toResponse(wishlist);
}
    @Override
    public void removeProduct(
            String email,
            Long productId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Wishlist wishlist = wishlistRepository.findByUser(user)
        .orElseGet(() -> {

            Wishlist newWishlist = Wishlist.builder()
                    .user(user)
                    .items(new ArrayList<>())
                    .build();

            return wishlistRepository.save(newWishlist);
        });

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        WishlistItem item = wishlistItemRepository
                .findByWishlistAndProduct(wishlist, product)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found in wishlist"));

        wishlist.getItems().remove(item);

        wishlistItemRepository.delete(item);
    }

}