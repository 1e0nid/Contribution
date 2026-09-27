package org.example.contribution.dto.business;

import java.math.BigDecimal;

public record DepositOutput (
        BigDecimal total,
        BigDecimal profit
) {}
