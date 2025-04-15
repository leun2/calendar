package com.leun.event.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.leun.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;

    private String description;

    private String location;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Color color;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Getter
    public enum Color {
        TOMATO("#FF6347"),
        LIGHT_PINK("#E67C73"),
        TANGERINE("#FFA500"),
        BANANA("#FFE135"),
        SAGE("#BCB88A"),
        BASIL("#0B8043"),
        PEACOCK("#039BE5"),
        BLUEBERRY("#4F86C6"),
        LAVENDER("#E6E6FA"),
        GRAPE("#8E24AA");

        private final String hexCode;

        Color(String hexCode) {
            this.hexCode = hexCode;
        }
    }

    public Event(User user, String title, String description, String location,
        LocalDateTime startTime,
        LocalDateTime endTime, Color color) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.location = location;
        this.startTime = startTime;
        this.endTime = endTime;
        this.color = color;
    }
}
