package com.fitmart.backend.service.impl;

import com.fitmart.backend.dto.request.CategoryRequest;
import com.fitmart.backend.dto.response.CategoryResponse;
import com.fitmart.backend.entity.Category;
import com.fitmart.backend.exception.BadRequestException;
import com.fitmart.backend.exception.ResourceNotFoundException;
import com.fitmart.backend.repository.CategoryRepository;
import com.fitmart.backend.service.CategoryService;
import com.fitmart.backend.util.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public CategoryResponse create(CategoryRequest request) {

        if (categoryRepository.existsByName(request.getName())) {
            throw new BadRequestException("Category already exists");
        }

        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        return CategoryMapper.toResponse(
                categoryRepository.save(category)
        );
    }

    @Override
    @Transactional
    public CategoryResponse update(Long id, CategoryRequest request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        return CategoryMapper.toResponse(
                categoryRepository.save(category)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        return CategoryMapper.toResponse(category);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAll() {

        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public void delete(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        categoryRepository.delete(category);
    }
}