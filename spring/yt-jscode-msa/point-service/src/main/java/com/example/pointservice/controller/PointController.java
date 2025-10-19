package com.example.pointservice.controller;

import com.example.pointservice.dto.AddPointRequestDto;
import com.example.pointservice.dto.DeductPointRequestDto;
import com.example.pointservice.service.PointService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/points")
public class PointController {
    private final PointService pointservice;

    public PointController(PointService pointservice) {
        this.pointservice = pointservice;
    }

    @PostMapping("add")
    public ResponseEntity<Void> addPoints(
        @RequestBody AddPointRequestDto addPointRequestDto
    ) {
        pointservice.addPoints(addPointRequestDto);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("deduct")
    public ResponseEntity<Void> deductPoints(
        @RequestBody DeductPointRequestDto deductPointRequestDto
    ) {
        pointservice.deductPoints(deductPointRequestDto);
        return ResponseEntity.noContent().build();
    }
}
