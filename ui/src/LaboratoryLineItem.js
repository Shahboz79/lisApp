import React, {Component} from 'react';
import {strings} from "./Utils";

class LaboratoryLineItem extends Component {

	addParameter() {
		this.props.addParameterLine();
	}
	removeParameter(itemKey) {
		this.props.removeParameterLine(itemKey);
	}

	render() {
		return (
			<div className="form-row">
				<div className="col-md-4">
					<label htmlFor={"itemName_" + this.props.itemKey}>{strings.name1}</label>
					<input id={"itemName_" + this.props.itemKey} defaultValue={this.props.item.name} className="form-control"/>
				</div>
				<div className="col-md-3">
					<label htmlFor={"unitMeasurement_" + this.props.itemKey}>{strings.unitMeasurement}</label>
					<input id={"unitMeasurement_" + this.props.itemKey} defaultValue={this.props.item.unit} className="form-control"/>
				</div>
				<div className="col-md-3">
					<label htmlFor={"normative_" + this.props.itemKey}>{strings.standard}</label>
					<textarea id={"normative_" + this.props.itemKey} defaultValue={this.props.item.normative} className="form-control"/>
				</div>
				<div className="col-md-2">
					<input type="hidden" id={"id_" + this.props.itemKey} value={this.props.item.id}/>
					<label>&nbsp;</label>
					<div>
						<button className="btn btnGreen" onClick={this.addParameter.bind(this)}><i className="fa fa-plus-square-o"/></button>
						<button className="btn btnBlue ml-1" onClick={this.removeParameter.bind(this, this.props.itemKey)}><i className="fa fa-minus-square-o"/></button>
					</div>
				</div>
			</div>
		)
	}
}

export default LaboratoryLineItem;