package com.fastcampus.jpa.bookmanager.domain;

import com.fastcampus.jpa.bookmanager.domain.listener.UserEntityListener;
import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity
//@EntityListeners(value = { MyEntityListener.class, UserEntityListener.class })
@EntityListeners(value = { UserEntityListener.class })
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity {
    @Id
    @GeneratedValue
    private Long id;

    @NonNull
    private String name;
    @NonNull
    private String email;

    @Enumerated
    private Gender gender;

    @Transient
    private String testData;

//    @OneToMany(fetch = FetchType.EAGER)
//    private List<Address> address;

//    @PrePersist
//    public void prePersist() {
//        this.createdAt = LocalDateTime.now();
//        this.updatedAt = LocalDateTime.now();
//    }
//
//    @PreUpdate
//    public void preUpdate() {
//        this.updatedAt = LocalDateTime.now();
//    }
}
