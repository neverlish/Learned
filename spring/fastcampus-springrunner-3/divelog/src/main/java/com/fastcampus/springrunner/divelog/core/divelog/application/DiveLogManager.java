package com.fastcampus.springrunner.divelog.core.divelog.application;

import com.fastcampus.springrunner.divelog.core.diveresort.application.DiveResortManager;
import com.fastcampus.springrunner.divelog.core.diveresort.domain.DiveResortRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiveLogManager implements DiveLogFinder, DiveLogEditor {
    private DiveResortRepository resortRepository;

    public DiveResortManager(DiveResortRepository resortRepository) {
        this.resortRepository = resortRepository;
    }
}
