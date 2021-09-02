package com.fastcampus.jpa.bookmanager.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class UserHistory extends BaseEntity  {

    @Id
    @GeneratedValue
    private Long id;

    private Long userId;

    private String name;

    private String email;
}
