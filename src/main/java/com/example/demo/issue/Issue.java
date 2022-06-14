package com.example.demo.issue;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Issue {

        @Id
        private int id;

        private LocalDate date;

        private String description;

        private String location;

        private String status;

        private String userId;


        private String supervisorId;

        private String equipmentId;

        public Issue() {
        }

        public Issue(int id, LocalDate date, String description, String location, String status, String userId, String supervisorId, String equipmentId) {
                this.id = id;
                this.date = date;
                this.description = description;
                this.location = location;
                this.status = status;
                this.userId = userId;
                this.supervisorId = supervisorId;
                this.equipmentId = equipmentId;
        }

        public int getId() {
                return id;
        }

        public void setId(int id) {
                this.id = id;
        }

        public LocalDate getDate() {
                return date;
        }

        public void setDate(LocalDate date) {
                this.date = date;
        }

        public String getDescription() {
                return description;
        }

        public String getUserId() {
                return userId;
        }

        public void setUserId(String userId) {
                this.userId = userId;
        }

        public String getSupervisorId() {
                return supervisorId;
        }

        public void setSupervisorId(String supervisorId) {
                this.supervisorId = supervisorId;
        }

        public void setDescription(String description) {
                this.description = description;
        }

        public String getLocation() {
                return location;
        }

        public void setLocation(String location) {
                this.location = location;
        }

        public String getStatus() {
                return status;
        }

        public void setStatus(String status) {
                this.status = status;
        }

        public String getEquipmentId() {
                return equipmentId;
        }

        public void setEquipmentId(String equipmentId) {
                this.equipmentId = equipmentId;
        }

        @Override
        public String toString() {
                return "Issue{" +
                        "id=" + id +
                        ", date=" + date +
                        ", description='" + description + '\'' +
                        ", location='" + location + '\'' +
                        ", status='" + status + '\'' +
                        ", equipmentId='" + equipmentId + '\'' +
                        '}';
        }

}
