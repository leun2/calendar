package com.leun.calendar.controller;

import com.leun.calendar.dto.CalendarDto;
import com.leun.calendar.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @GetMapping("/calendar")
    public ResponseEntity<CalendarDto> getCalendar(@AuthenticationPrincipal UserDetails userDetails)
        throws Exception {

        CalendarDto calendar = calendarService.findCalendar(userDetails.getUsername());

        return ResponseEntity.ok(calendar);
    }

    @GetMapping("/calendar/{unit}")
    public ResponseEntity<CalendarDto> getCalendarByUnit(
        @AuthenticationPrincipal UserDetails userDetails,
        @PathVariable("unit") String unit) throws Exception {

        CalendarDto calendar = calendarService.findCalendarByUnit(userDetails.getUsername(), unit);

        return ResponseEntity.ok(calendar);
    }

    @GetMapping("/calendar/{unit}/{year}/{month}/{day}")
    public ResponseEntity<CalendarDto> getCalendarByDate(
        @AuthenticationPrincipal UserDetails userDetails,
        @PathVariable("unit") String unit,
        @PathVariable("year") Integer year,
        @PathVariable("month") Integer month,
        @PathVariable("day") Integer day) throws Exception {

        CalendarDto calendar = calendarService.findCalendarByDate(userDetails.getUsername(), unit, year, month, day);

        return ResponseEntity.ok(calendar);
    }
}
