package com.ismael.localguide.application.repository.repository;

import com.ismael.localguide.domain.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface TransactionRepository extends JpaRepository<Transaction, Long>, JpaSpecificationExecutor<Transaction> {

    @Query("SELECT COALESCE(SUM(t.amount), 0) " +
            "FROM Transaction t " +
            "WHERE t.transactionDate >= :startDate " +
            "AND t.transactionDate <= :endDate")
    int sumTransactionsCurrentYear(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.transactionDate >= CURRENT_DATE() AND t.transactionDate <= LAST_DAY(CURRENT_DATE())")
    int sumTransactionsCurrentMonth();

}