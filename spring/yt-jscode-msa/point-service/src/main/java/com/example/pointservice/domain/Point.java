package com.example.pointservice.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "points")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pointId;

    private Long userId;

    private int amount;

    public Point() {
    }

    public Point(Long userId, int amount) {
        this.userId = userId;
        this.amount = amount;
    }

    public Long getPointId() {
        return pointId;
    }

    public Long getUserId() {
        return userId;
    }

    public int getAmount() {
        return amount;
    }

    public void addAmount(int amount) {
        this.amount += amount;
    }

    public void deductAmount(int amount) {
        this.amount -= amount;
    }
}
