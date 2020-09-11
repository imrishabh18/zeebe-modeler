/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import extensionElementsHelper from 'bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper';

/**
* Returns the 'zeebe:calledElement' extension element of a passed business object
*
* @param  {bo} businessObject representing a 'bpmn:extensionElement'
*
* @return {bo} 'zeebe:calledElement' business object
*/
export function getCalledElement(bo) {
  const elements = getExtensionElements(bo, 'zeebe:CalledElement') || [];
  return elements[0];
}

/**
  * Returns a list containing the 'bpmn:extensionElements' of the passed
  * business object
  *
  * @param  {bo} businessObject
  *
  * @return {Array} a list of 'bpmn:extensionElements' moddle business objects
  */
export function getExtensionElements(bo, type) {
  return extensionElementsHelper.getExtensionElements(bo, type);
}

/**
  * Returns true if the attribute 'propagateAllChildVariables' in 'zeebe:calledElement'
  * extension element is set to true or 'true'
  *
  * @param  {businessObject} bo representing the business object of the 'zeebe:calledElement'
  *
  * @return {boolean} a boolean value indicating whether attribute 'propagateAllChildVariables'
  * is set to true or 'true'
  */
export function isPropagateAllChildVariables(bo) {
  const calledElement = getCalledElement(bo);
  const propagateAllChildVariables = calledElement && calledElement.get('propagateAllChildVariables');
  return propagateAllChildVariables === undefined ?
    undefined : propagateAllChildVariables === true || propagateAllChildVariables === 'true';
}

/**
* Returns the 'zeebe:ioMapping' extension element of a passed business object
*
* @param  {bo} businessObject representing a 'bpmn:extensionElement'
*
* @return {bo} 'zeebe:ioMapping' business object
*/
function getIoMapping(bo) {
  const elements = getExtensionElements(bo, 'zeebe:IoMapping') || [];
  return elements[0];
}

/**
* Returns a boolean indicating whether the passed business object has an output
* mapping
*
* @param  {bo} businessObject
*
* @return {boolean}
*/
export function hasOutputMapping(bo) {
  const ioMapping = getIoMapping(bo);
  return ioMapping && ioMapping.outputParameters[0] ? true: false;
}
