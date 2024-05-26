package com.ismael.localguide.domain.dto;

import com.ismael.localguide.domain.PaymentType;
import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.TransactionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {
    private Long id;
    private double amount;
    private TransactionType type;
    private PaymentType paymentType;
    private LocalDateTime transactionDate;
    private Long reservation;
}
