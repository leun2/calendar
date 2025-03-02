package com.leun.event.entity;

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

@Entity
@Data
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

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Boolean isAllDay;

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
        TANGERINE("#FFA500"),
        BANANA("#FFE135"),
        SAGE("#BCB88A"),
        BLUEBERRY("#4F86C6"),
        LAVENDER("#E6E6FA");

        private final String hexCode;

        Color(String hexCode) {
            this.hexCode = hexCode;
        }
    }
}
