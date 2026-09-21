package org.example.contribution.dto.api;

import java.math.BigDecimal;

public record DepositResponseDto(
        BigDecimal total,
        BigDecimal profit
) {}
