package com.leun.event.repository;

import com.leun.event.entity.Event;
import com.leun.event.entity.Event.Color;
import com.leun.user.entity.User;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Event e SET e.title = :title, e.description = :description, e.location = :location, e.startTime = :startTime, e.endTime = :endTime, e.color = :color WHERE e.id = :id")
    void updateEvent(@Param("id") Long id,
        @Param("title") String title,
        @Param("description") String description,
        @Param("location") String location,
        @Param("startTime") LocalDateTime startTime,
        @Param("endTime") LocalDateTime endTime,
        @Param("color") Color color);

    @Query("SELECT e FROM Event e WHERE e.user = :user")
    List<Event> findEventsByUser(@Param("user") User user);

    @Query("SELECT e FROM Event e WHERE e.user = :user AND e.startTime >= :start AND e.endTime < :end")
    List<Event> findEventsByUserAndPeriod(@Param("user") User user, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
