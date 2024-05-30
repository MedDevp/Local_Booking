package org.example.backend.Repository;

import org.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    long count();

    Optional<User> findByRole(String admin);
}
