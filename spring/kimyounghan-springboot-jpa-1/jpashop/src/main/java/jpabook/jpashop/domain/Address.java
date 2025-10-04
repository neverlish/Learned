package jpabook.jpashop.domain;
import lombok.Getter;
import jakarta.persistence.Embeddable;
@Embeddable
@Getter
public class Address {
    private String city;
    private String street;
    private String zipcode;
}