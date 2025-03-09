package com.leun.user.repository;

import com.leun.user.dto.UserSettingDto;
import com.leun.user.entity.User;
import com.leun.user.entity.UserSetting;
import jakarta.transaction.Transactional;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSettingRepository extends JpaRepository<UserSetting, Long> {
    Optional<UserSetting> findByUser(User user);

    @Query("SELECT new com.leun.user.dto.UserSettingDto$Response(us.language, us.country, us.timezone) FROM User u JOIN u.userSetting us WHERE u.email = :email")
    UserSettingDto.Response findUserSettingByEmail(@Param("email") String email);

    @Modifying
    @Transactional
    @Query("UPDATE UserSetting us SET us.language = :language WHERE us.user.email = :email")
    void updateUserLanguage(@Param("email") String email, @Param("language") String language);

    @Modifying
    @Transactional
    @Query("UPDATE UserSetting us SET us.country = :country WHERE us.user.email = :email")
    void updateUserCountry(@Param("email") String email, @Param("country") String country);

    @Modifying
    @Transactional
    @Query("UPDATE UserSetting us SET us.timezone = :timezone WHERE us.user.email = :email")
    void updateUserTimezone(@Param("email") String email, @Param("timezone") String timezone);
}
