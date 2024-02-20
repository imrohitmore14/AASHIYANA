package com.aashiyana.dto;

public class AdminNameResponse {
	private String adminName;

    public AdminNameResponse(String adminName) {
        this.adminName = adminName;
    }

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}
}
