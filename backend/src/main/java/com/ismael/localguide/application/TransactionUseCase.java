package com.ismael.localguide.application;

import com.ismael.localguide.application.repository.repository.TransactionRepository;
import com.ismael.localguide.domain.PaymentType;
import com.ismael.localguide.domain.Reservation;
import com.ismael.localguide.domain.Transaction;
import com.ismael.localguide.domain.TransactionType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Service
public class TransactionUseCase {

    private final TransactionRepository transactionRepository;

    public void processTransaction(Map<String, Object> dataReservation, Reservation reservation) throws Exception {
        try {
            Transaction transaction = new Transaction();

            Object totalPriceObj = dataReservation.get("totalPrice");
            if (totalPriceObj == null) {
                throw new Exception("totalPrice is null");
            }
            double totalPrice = (totalPriceObj instanceof Number) ? ((Number) totalPriceObj).doubleValue() : Double.parseDouble((String) totalPriceObj);

            transaction.setAmount(totalPrice);
            transaction.setType(TransactionType.RESERVA);

            String paymentTypeStr = (String) dataReservation.get("paymentType");
            if (paymentTypeStr == null) {
                throw new Exception("paymentType is null or not a valid string");
            }
            transaction.setPaymentType(PaymentType.valueOf(paymentTypeStr));
            transaction.setTransactionDate(LocalDateTime.now());
            transaction.setReservation(reservation);

            transactionRepository.save(transaction);
        } catch (Exception e) {
            throw new Exception("Error processing transaction: " + e.getMessage());
        }
    }

    public List<Transaction> listTransaction() {
        return transactionRepository.findAll();
    }
}
