package com.lissoft.to;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class AnalyzeItemTO implements Serializable {

	private Long id;
	private String name;
	private String unit;
	private String result;
	private Date resultDate;
	private String norm;
	private String hostCode;
	private List<AnalyzeItemTO> params = new ArrayList<>();

	public AnalyzeItemTO(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public AnalyzeItemTO(Long id, String name, String unit, String norm) {
		this.id = id;
		this.name = name;
		this.unit = unit;
		this.norm = norm;
	}
}
