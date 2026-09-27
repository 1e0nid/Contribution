package org.example.contribution.dto.business;

import java.math.BigDecimal;

public record DepositInput (
        BigDecimal amount,
        Integer months,
        BigDecimal rate
) {}
