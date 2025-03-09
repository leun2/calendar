package com.leun.task.repository;

import com.leun.event.entity.Event.Color;
import com.leun.task.entity.Task;
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
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Task t SET t.title = :title, t.description = :description, t.dueDate = :dueDate, t.isCompleted = :isCompleted WHERE t.id = :id")
    void updateTask(@Param("id") Long id,
        @Param("title") String title,
        @Param("description") String description,
        @Param("dueDate") LocalDateTime dueDate,
        @Param("isCompleted") Boolean isCompleted);

    @Query("SELECT t FROM Task t WHERE t.user = :user")
    List<Task> findTasksByUser(@Param("user") User user);

    @Query("SELECT t FROM Task t WHERE t.user = :user AND t.dueDate >= :start AND t.dueDate < :end")
    List<Task> findTasksByUserAndPeriod(@Param("user") User user, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
