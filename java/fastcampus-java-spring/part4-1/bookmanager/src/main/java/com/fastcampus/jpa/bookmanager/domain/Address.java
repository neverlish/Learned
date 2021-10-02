package com.fastcampus.jpa.bookmanager.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    public String city;

    private String district;

    @Column(name = "address_detail")
    private String detail;

    private String zipCode;
}
