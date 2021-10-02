package com.fastcampus.jpa.bookmanager.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class UserHistory extends BaseEntity  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "city", column = @Column(name = "home_city")),
        @AttributeOverride(name = "district", column = @Column(name = "home_district")),
        @AttributeOverride(name = "detail", column = @Column(name = "home_address_detail")),
        @AttributeOverride(name = "zipCode", column = @Column(name = "home_zip_code"))
    })
    private Address homeAddress;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "city", column = @Column(name = "company_city")),
        @AttributeOverride(name = "district", column = @Column(name = "company_district")),
        @AttributeOverride(name = "detail", column = @Column(name = "company_address_detail")),
        @AttributeOverride(name = "zipCode", column = @Column(name = "company_zip_code"))
    })
    private Address companyAddress;

    @ManyToOne
    @ToString.Exclude
    private User user;
}
