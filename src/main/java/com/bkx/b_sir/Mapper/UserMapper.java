package com.bkx.b_sir.Mapper;

import com.bkx.b_sir.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserMapper extends JpaRepository<UserEntity,Long> {

    UserEntity findByUserName(String username);
}
