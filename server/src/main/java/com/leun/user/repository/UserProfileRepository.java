package com.leun.user.repository;

import com.leun.user.dto.UserProfileDto;
import com.leun.user.entity.User;
import com.leun.user.entity.UserProfile;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUser(User user);

    @Query("SELECT new com.leun.user.dto.UserProfileDto$Response(up.name, up.image) FROM User u JOIN u.userProfile up WHERE u.email = :email")
    UserProfileDto.Response findUserProfileByEmail(@Param("email") String email);

    @Modifying
    @Transactional
    @Query("UPDATE UserProfile up SET up.name = :name WHERE up.user.email = :email")
    void updateUserName(@Param("email") String email, @Param("name") String name);

    @Modifying
    @Transactional
    @Query("UPDATE UserProfile up SET up.image = :image WHERE up.user.email = :email")
    void updateUserImage(@Param("email") String email, @Param("image") String image);
}
