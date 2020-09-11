/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import {
  bootstrapModeler,
  inject
} from 'bpmn-js/test/helper';

import modelingModule from 'bpmn-js/lib/features/modeling';
import coreModule from 'bpmn-js/lib/core';
import zeebeModdleExtensions from 'zeebe-bpmn-moddle/resources/zeebe';
import behaviorModules from '../behavior/';


describe('features/modeling/behavior - create call activities', function() {

  const testModules = [
    coreModule,
    modelingModule,
    behaviorModules
  ];

  const moddleExtensions = {
    zeebe: zeebeModdleExtensions
  };

  const processDiagramXML = require('./process-simple.bpmn');

  beforeEach(bootstrapModeler(processDiagramXML, {
    modules: testModules,
    moddleExtensions
  }));

  it('should not execute on open', inject(function(elementRegistry) {

    // given
    const callActivity1 = elementRegistry.get('callActivity_1'),
          callActivity2 = elementRegistry.get('callActivity_2');

    // when
    // Diagram was opened

    // then
    expect(callActivity1.businessObject.extensionElements).to.be.undefined;
    expect(callActivity2.businessObject.extensionElements).to.exist;
    expect(callActivity2.businessObject.extensionElements.propagateAllChildVariables).to.be.undefined;
  }));


  it('should execute on shape.create for bpmn:CallActivity', inject(function(canvas,
      modeling, elementFactory) {

    // given
    const rootElement = canvas.getRootElement();

    // when
    const newShape = modeling.createShape({ type: 'bpmn:CallActivity' }, { x: 100, y: 100 }, rootElement);

    // then
    expect(newShape.businessObject.extensionElements).to.exist;
    expect(newShape.businessObject.extensionElements.values[0].$attrs.propagateAllChildVariables).to.be.false;
  }));

  it('should not execute on shape.create for bpmn:Task', inject(function(canvas,
      modeling, elementFactory) {

    // given
    const rootElement = canvas.getRootElement();

    // when
    const newShape = modeling.createShape({ type: 'bpmn:Task' }, { x: 100, y: 100 }, rootElement);

    // then
    expect(newShape.businessObject.extensionElements &&
      newShape.businessObject.extensionElements.values[0].$attrs.propagateAllChildVariables).to.be.undefined;
  }));


});
