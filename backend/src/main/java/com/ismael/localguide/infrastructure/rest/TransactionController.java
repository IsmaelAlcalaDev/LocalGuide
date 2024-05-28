package com.ismael.localguide.infrastructure.rest;

import com.ismael.localguide.application.TransactionUseCase;
import com.ismael.localguide.domain.Transaction;
import com.ismael.localguide.domain.dto.TransactionDTO;
import com.ismael.localguide.infrastructure.rest.mapper.TransactionMapper;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transactions")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, maxAge = 3600, allowCredentials = "true")
public class TransactionController {

    @Autowired
    private TransactionUseCase transactionService;
    @Autowired
    private TransactionMapper transactionMapper;

    @GetMapping(value = "v1/listTransactions")
    public ResponseEntity<?> listTransaction() {
        try {
            List<Transaction> transactions = transactionService.listTransaction();
            List<TransactionDTO> transactionDTOs = transactions.stream()
                    .map(transactionMapper::toDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(transactionDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al recuperar los datos de las transacciones: " + e.getMessage());
        }
    }
}
