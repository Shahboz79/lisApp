package com.lissoft.to;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LaboratoryTO implements Serializable {

	private Long id;
	private String name;
	private String code;
	private SimpleTO organization;
	private SimpleTO medServiceGroup;
	private SimpleTO medService;
	private List<AnalyzeItemTO> params = new ArrayList<>();
}
