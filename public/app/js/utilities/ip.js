
function onKeyDown(e)
{
  var breakOps = false;
  e = window.event || e; // old IE support

  //if(sessionData.focusElement == viewPort)
  {
    if(e.altKey == true)
    {
      sessionData.isCamRotating = true;
      sessionData.startX = sessionData.lastXPos;
      sessionData.startY = sessionData.lastYPos;
    }
    
    switch(e.keyCode)
    {
      case 37: /* Left Arrow -> Left/Right Side View */
      {
        sceneData.viewMode = "Orthographic"; if(sessionData.viewCameraProps.viewPortCamPresp == true) { sceneData.viewMode = "Prespective"; }
        if(e.shiftKey == true) { sessionData.xyAngle = 0; sessionData.yzAngle = 3*PI/2; sessionData.xzAngle = 0; sessionData.viewCameraProps.camUp.set(0, 0, 1); sceneData.viewMode = "Left " + sceneData.viewMode + " View"; } /* Left Side View */
        else { sessionData.xyAngle = 0; sessionData.yzAngle = PI/2; sessionData.xzAngle = PI; sessionData.viewCameraProps.camUp.set(0, 0, 1); sceneData.viewMode = "Right " + sceneData.viewMode + " View"; } /* Right Side View */
        $("#cameraStatus").html(sceneData.viewMode);
        sceneData.gridXY.visible = false; sceneData.gridXZ.visible = false; sceneData.gridYZ.visible = true;
        sessionData.viewCameraProps.lookAt.set(0, 0, 0);
        sessionData.viewCameraProps.fixedView = true;
      }
      break;

      case 38: /* Up Arrow -> Top/Bottom View */
      {
        if(e.altKey == true)
        {
          window.event.wheelDelta = 1;
          zoomControl({wheelDelta: 1});
        }
        else
        {
          sceneData.viewMode = "Orthographic"; if(sessionData.viewCameraProps.viewPortCamPresp == true) { sceneData.viewMode = "Prespective"; }
          if(e.shiftKey == true) { sessionData.xyAngle = 3*PI/2; sessionData.yzAngle = PI; sessionData.xzAngle = 0; sessionData.viewCameraProps.camUp.set(0, -1, 0); sceneData.viewMode = "Bottom " + sceneData.viewMode + " View"; } /* Bottom View */
          else { sessionData.xyAngle = PI/2; sessionData.yzAngle = PI; sessionData.xzAngle = 0; sessionData.viewCameraProps.camUp.set(0, 1, 0); sceneData.viewMode = "Top " + sceneData.viewMode + " View"; } /* Top View */
          $("#cameraStatus").html(sceneData.viewMode);
          sceneData.gridXY.visible = true; sceneData.gridXZ.visible = false; sceneData.gridYZ.visible = false;
          sessionData.viewCameraProps.lookAt.set(0, 0, 0);
          sessionData.viewCameraProps.fixedView = true;
        }
      }
      break;

      case 39: /* Right Arrow -> Front/Back View */
      {
        sceneData.viewMode = "Orthographic"; if(sessionData.viewCameraProps.viewPortCamPresp == true) { sceneData.viewMode = "Prespective"; }
        if(e.shiftKey == true) { sessionData.xyAngle = 0; sessionData.yzAngle = PI; sessionData.xzAngle = 3*PI/2; sessionData.viewCameraProps.camUp.set(0, 0, 1); sceneData.viewMode = "Back " + sceneData.viewMode + " View"; } /* Back View */
        else { sessionData.xyAngle = 0; sessionData.yzAngle = 0; sessionData.xzAngle = PI/2; sessionData.viewCameraProps.camUp.set(0, 0, 1); sceneData.viewMode = "Front " + sceneData.viewMode + " View"; } /* Front View */
        $("#cameraStatus").html(sceneData.viewMode);
        sceneData.gridXY.visible = false; sceneData.gridXZ.visible = true; sceneData.gridYZ.visible = false;
        sessionData.viewCameraProps.lookAt.set(0, 0, 0);
        sessionData.viewCameraProps.fixedView = true;
      }
      break;

      case 40: /* Down Arrow */
      {
        if(e.altKey == true)
        {
          window.event.wheelDelta = -1;
          zoomControl({wheelDelta: -1});
        }
        else
        {
          sceneData.viewMode = "Orthographic"; if(sessionData.viewCameraProps.viewPortCamPresp == true) { sceneData.viewMode = "Prespective"; }
          sessionData.xyAngle = PI/4; sessionData.yzAngle = -3*PI/4; sessionData.xzAngle = -PI/4; sceneData.viewMode = sceneData.viewMode + " View"; /* Presp/Orth View */
          $("#cameraStatus").html(sceneData.viewMode);
          sceneData.gridXY.visible = true; sceneData.gridXZ.visible = false; sceneData.gridYZ.visible = false;
          sessionData.viewCameraProps.camUp.set(0, 0, 1);
          sessionData.viewCameraProps.lookAt.set(sceneData.cursor.position.x, sceneData.cursor.position.y, sceneData.cursor.position.z);
          sessionData.viewCameraProps.fixedView = false;
        }
      }
      break;

      case 80:  /* P -> Switch off/on Prespective view */
      case 112: /* p*/
      {
        if(sessionData.viewCameraProps.viewPortCamPresp == true)
        {
          sessionData.viewCameraProps.viewPortCamPresp = false;
        }
        else
        {
          sessionData.viewCameraProps.viewPortCamPresp = true;
        }

        if(sessionData.viewCameraProps.viewPortCamPresp == true) { sceneData.viewMode = sceneData.viewMode.replace("Orthographic", "Prespective"); }
        else { sceneData.viewMode = sceneData.viewMode.replace("Prespective", "Orthographic"); }
        $("#cameraStatus").html(sceneData.viewMode);
        
        applyRotation();
        applyZoom();
      }
      break;
      
      case 79:  /* O -> Back to origin / open saved scene */
      case 111: /* o*/
      {
        if(e.ctrlKey == true)
        {
          importScene();
        }
        else
        {
          sceneData.cursor.position.set(0, 0, 0);
          if(sessionData.viewCameraProps.fixedView == false)
          {
            sessionData.viewCameraProps.lookAt.set(sceneData.cursor.position.x, sceneData.cursor.position.y, sceneData.cursor.position.z);
          }
        }
        
        e.preventDefault(); breakOps = true;
      }
      break;
      
      case 83:  /* S -> Save scene */
      case 115: /* s */
      {
        if(e.ctrlKey == true)
        {
          exportScene();
          breakOps = true;
        }
        
        e.preventDefault();
      }
      break;

      case 78: /* N -> new */
      case 110: /* n */
      {
        sceneData.viewPortScene.remove(sceneData.objroot);
        sceneData.objroot = undefined;
        createScene(null);
      }
      break;
      
      case 121: /* y -> Redo */
      case 89:  /* Y */
      {
        if(e.ctrlKey == true)
        {
          redoStep();
        }
      }
      break;
      
      case 122: /* z -> Undo */
      case 90:  /* Z */
      {
        if(e.ctrlKey == true)
        {
          undoStep();
        }
      }
      break;
      
      case 08:  /* Backspace */
      case 127: /* Delete */
      {
        e.preventDefault();
      }
      break;

      default:
      break;
    }
    
    /* Key operations when object selected */
    if((sessionData.objSelect.isSelected == true) && (breakOps == false))
    {
      var selectedObj = getSelectedObject();
      var selectObjOutline = getSelectedObjectOutline();
      
      /* Operations for a selected object in non edit mode */
      if((sessionData.objSelect.isEdit == false) && (selectedObj != null))
      {
        switch(e.keyCode)
        {
          /* 1 - 9 -> Set pre-defined colors */
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
          {
            var colors = [0xffffff, 0xffff00, 0xff00ff, 0x00ffff, 0xff0000, 0x00ff00, 0x0000ff, 0xcccccc, 0x666666];
            var idx = e.keyCode - 49;
            selectedObj.material.color.setHex(colors[idx]);
          }
          break;
          
          case 68:  /* D -> Duplicate objects */
          case 100: /* d */
          {
            /* Before duplicating, leave edit mode and unselect */
            leaveEditMode();
            unSelectObject(true);
            
            var clonedObj = new THREE.Mesh(selectedObj.geometry, selectedObj.material);
            
            clonedObj.name = "c" + selectedObj.name;
            sceneData.objroot.add(clonedObj);
            
            sessionData.objSelect.objName = clonedObj.name;
            selectObject(true);
            
            sessionData.selectData.isScaling  = false;
            sessionData.selectData.isDragging = true;
            sessionData.selectData.isRotating = false;
            
            sessionData.selectData.direction = 'x';
            setLocalAxis(sessionData.selectData.direction);
          }
          break;

          case 08:  /* Backspace -> Delete objects */
          case 127: /* Delete */
          {
            sceneData.objroot.remove(selectedObj);
            e.preventDefault();
          }
          break;

          case 87:  /* W -> WIREFRAME change the object to wireframe mode */
          case 119: /* w */
          {
            if(sessionData.objSelect.wireframeMode == true)
            {
              sessionData.objSelect.wireframeMode = false;
            }
            else
            {
              sessionData.objSelect.wireframeMode = true;
            }
            
            selectedObj.material.wireframe      = sessionData.objSelect.wireframeMode;
            selectObjOutline.material.wireframe = sessionData.objSelect.wireframeMode;
          }
          break;
          
          case 69:  /* E -> EDIT - edit face,vertex or edges */
          case 101: /* e */
          {
            sessionData.objSelect.editMode = 'v';
            enterEditMode(true);
          }
          break;
          
          default:
          break;
        }
      }
      /* Operations for a selected object in edit mode */
      else
      {
        switch(e.keyCode)
        {
          case 69:  /* E -> EDIT - edit face,vertex or edges */
          case 101: /* e */
          {
            leaveEditMode();
          }
          break;
          
          case 116: /* t -> Vertex select */
          case 84: /* T */
          {
            /* Only in edit mode */
            if(sessionData.objSelect.isEdit == true)
            {
              /* Un-select object (vef) and leave edit mode */
              unSelectObject(false, false);
              leaveEditMode();
              
              sessionData.objSelect.editMode = 'v';
              enterEditMode(true);
            }
          }
          break;
          
          case 117: /* u -> Edge select */
          case 85: /* U */
          {
            /* Only in edit mode */
            if(sessionData.objSelect.isEdit == true)
            {
              /* Un-select object (vef) and leave edit mode */
              unSelectObject(false, false);
              leaveEditMode();
              
              sessionData.objSelect.editMode = 'e';
              enterEditMode(true);
            }
          }
          break;
          
          case 118: /* v -> Face select */
          case 86: /* V */
          {
            /* Only in edit mode */
            if(sessionData.objSelect.isEdit == true)
            {
              /* Un-select object (vef) and leave edit mode */
              unSelectObject(false, false);
              leaveEditMode();
              
              sessionData.objSelect.editMode = 'f';
              enterEditMode(true);
            }
          }
          break;
          
          default:
          break;
        }
        
        /* Get the edit mode selected object (i.e. vertex, edge or face) */
        selectedObj = getSelectedVef();
      }
      
      /* When a selected object is available */
      if(selectedObj != null)
      {
        /* Operations allowed both in edit and non edit modes */
        switch(e.keyCode)
        {
          case 27: /* ESC -> unselect */
          {
            unSelectObject(false, true);
          }
          break;
          
          case 71:  /* G -> Grab (drag) object */
          case 103: /* g */
          {
            sessionData.selectData.isScaling  = false;
            sessionData.selectData.isDragging = true;
            sessionData.selectData.isRotating = false;
            sessionData.selectData.direction  = 'x';
            setLocalAxis(sessionData.selectData.direction);
          }
          break;

          case 83:  /* S -> Scale objects */
          case 115: /* s */
          {  
            sessionData.selectData.isDragging = false;
            sessionData.selectData.isScaling  = true;
            sessionData.selectData.isRotating = false;
            sessionData.selectData.direction  = ' ';
            setLocalAxis(sessionData.selectData.direction);
          }
          break;
          
          case 82:   /* R -> Rotate objects */
          case 114:  /* r */
          {
            sessionData.selectData.isDragging = false;
            sessionData.selectData.isScaling  = false;
            sessionData.selectData.isRotating = true;
            sessionData.selectData.direction  = 'x';
            setLocalAxis(sessionData.selectData.direction);
          }
          break;
          
          case 120: /* x -> Select x-axis */
          case 88:  /* X */
          {
            resetObject(null);
            sessionData.selectData.direction = 'x';
            setLocalAxis(sessionData.selectData.direction);
          }
          break;
          
          case 121: /* y -> Select y-axis */
          case 89:  /* Y */
          {
            resetObject(null);
            sessionData.selectData.direction = 'y';
            setLocalAxis(sessionData.selectData.direction);
          }
          break;
          
          case 122: /* z -> Select z-axis */
          case 90:  /* Z */
          {
            resetObject(null);
            sessionData.selectData.direction = 'z';
            setLocalAxis(sessionData.selectData.direction);
          }
          break;
          
          case 32: /* SpaceBar -> De-select axis */
          {
            resetObject(null);
            sessionData.selectData.direction = ' ';
            setLocalAxis(sessionData.selectData.direction);
          }
          break;
          
          default:
          break;
        }
      }
    }
  }
  
  /* Render again */
  render(true);
  
  return false;
}

function onKeyUp(e)
{
  if(e.altKey == false)
  {
    sessionData.isCamRotating = false;
  }
  
  return false;
}

function setLocalAxis(dir)
{
  /* Remove any existing local axis attached to the scene */
  sceneData.viewPortScene.remove(sceneData.selectAxis.currLocalAxis);
  
  /* Select a local axis based on the given direction */
  if( dir == 'x') {sceneData.selectAxis.currLocalAxis = sceneData.selectAxis.localXAxis; }
  else if(dir == 'y') {sceneData.selectAxis.currLocalAxis = sceneData.selectAxis.localYAxis; }
  else if(dir == 'z') {sceneData.selectAxis.currLocalAxis = sceneData.selectAxis.localZAxis; }
  else { sceneData.selectAxis.currLocalAxis = sceneData.selectAxis.localAxis; }
  
  /* Set the axis location and add to the scene */
  sceneData.selectAxis.currLocalAxis.position.set(sessionData.selObjPos.x, sessionData.selObjPos.y, sessionData.selObjPos.z);
  sceneData.viewPortScene.add(sceneData.selectAxis.currLocalAxis);
}

function applyZoom()
{
  var cam = getCurrentCamera();
  
  if(sessionData.viewCameraProps.viewPortCamPresp == false)
  {
    cam.top    = viewPort.height * sessionData.viewCameraProps.zoomMultiplier;
    cam.bottom = -viewPort.height * sessionData.viewCameraProps.zoomMultiplier;
    cam.left   = -viewPort.width * sessionData.viewCameraProps.zoomMultiplier;
    cam.right  = viewPort.width * sessionData.viewCameraProps.zoomMultiplier;
  }
  else
  {
    cam.fov = sessionData.viewCameraProps.viewAngle;
  }
  
  var oldScale = sceneData.cursor.scale.x;
  sceneData.cursor.scale.multiplyScalar(sessionData.viewCameraProps.zoomMultiplier*2/oldScale);
}

function zoomControl(e)
{
  e = window.event || e; // old IE support
  
  /*var curPos = getCursorPos(e);
  curPos.x = curPos.x * sceneData.gridSize; curPos.y = curPos.y * sceneData.gridSize; curPos.z = curPos.z * sceneData.gridSize;
  sessionData.viewCameraProps.lookAt.set(curPos.x, curPos.y, curPos.z);*/

  if((sessionData.viewCameraProps.zoomMultiplier > 0.1) && (e.wheelDelta > 0))
  {
    sessionData.viewCameraProps.zoomMultiplier -= 0.05;
  }
  else if((sessionData.viewCameraProps.zoomMultiplier < 1.5) && (e.wheelDelta < 0))
  {
    sessionData.viewCameraProps.zoomMultiplier += 0.05;
  }
  else
  {}

  if((sessionData.viewCameraProps.viewAngle >= 10) && (e.wheelDelta > 0))
  {
    sessionData.viewCameraProps.viewAngle -= 3;
  }
  else if((sessionData.viewCameraProps.viewAngle <= 172) && (e.wheelDelta < 0))
  {
    sessionData.viewCameraProps.viewAngle += 3;
  }
  else
  {}

  applyZoom();

  /* Render again */
  render(true);

  return false;
}

function onMouseDown(e)
{
  e = window.event || e; // old IE support

  sessionData.focusElement = e.target;
  sessionData.startX = e.clientX;
  sessionData.startY = e.clientY;

  if(sessionData.focusElement == viewPort)
  {
    if(e.button == 0)
    {
      if(sessionData.objSelect.isSelected == false)
      {        
        setCursorPos(e);
      }
      if(sessionData.viewCameraProps.fixedView == false)
      {
        sessionData.viewCameraProps.lookAt.set(sceneData.cursor.position.x, sceneData.cursor.position.y, sceneData.cursor.position.z);
      }
      if((sessionData.selectData.isRotating == true) ||
         (sessionData.selectData.isScaling  == true) ||
         (sessionData.selectData.isDragging == true))
      {
        saveStep("Object-Edit");
      }
      unSelectObject(false, false);
    }
    else if(e.button == 1)
    {
      sessionData.isCamRotating = true;
    }
    else if(e.button == 2)
    {
      unSelectObject(false, false);
      
      var obj = findObjectsInPos(e);

      if(obj.length > 0)
      {
        if(sessionData.objSelect.isEdit == false)
        {
          if(sessionData.objSelect.isSelected == false)
          {
            sessionData.objSelect.objName = obj[0].object.name;
            selectObject(true);
          }
        }
        else
        {
          if(sessionData.vefSelect.isSelected == false)
          {
            sessionData.vefSelect.objName = obj[0].object.name;
            selectVef(true);
          }
        }
      }
      
      render(true);
    }
  }

  e.preventDefault();
  e.stopPropagation();
  
  /* Render again */
  render(true);

  return false;
}

function onMouseUp(e)
{
  e = window.event || e; // old IE support

  sessionData.focusElement = e.target;

  if(e.button == 1)
  {
    sessionData.isCamRotating = false;
  }

  e.preventDefault();
  e.stopPropagation();

  return false;
}

function onMouseClick(e)
{
  e.preventDefault();
  e.stopPropagation();

  return false;
}

function onContextMenu(e)
{
  e.preventDefault();
  e.stopPropagation();

  return false;
}

function onMouseMove(e)
{
  e = window.event || e; // old IE support
  
  sessionData.lastXPos = e.clientX;
  sessionData.lastYPos = e.clientY;
  
  if(sessionData.isCamRotating == true)
  {
    rotateCamera(e);
  }
  else if(sessionData.selectData.isDragging == true)
  {
    dragCurrElement(e);
  }
  else if(sessionData.selectData.isScaling == true)
  {
    scaleCurrElement(e);
  }
  else if(sessionData.selectData.isRotating == true)
  {
    rotateCurrElement(e);
  }
}

function applyRotation()
{
  var cam = getCurrentCamera();
  
  cam.position.x = 1000 * Math.sin(sessionData.yzAngle);
  cam.position.y = 1000 * Math.sin(sessionData.xzAngle);
  cam.position.z = 1000 * Math.sin(sessionData.xyAngle);
  
  sceneData.lightl.position.x = sceneData.gridSize * Math.sin(sessionData.yzAngle+PI/7); sceneData.lightr.position.x = sceneData.gridSize * Math.sin(sessionData.yzAngle-PI/7);
  sceneData.lightl.position.y = sceneData.gridSize * Math.sin(sessionData.xzAngle+PI/8); sceneData.lightr.position.y = sceneData.gridSize * Math.sin(sessionData.xzAngle-PI/8);
  sceneData.lightl.position.z = sceneData.gridSize * Math.sin(sessionData.xyAngle+PI/9); sceneData.lightr.position.z = sceneData.gridSize * Math.sin(sessionData.xyAngle-PI/9);
  
  DebugInfo("applyRotation: Camera.xyz (" + cam.position.x + ", " + cam.position.y + ", " + cam.position.z + ")");
  DebugInfo("applyRotation: Camera.angle (" + (sessionData.yzAngle/PI) + ", " + (sessionData.xzAngle/PI) + ", " + (sessionData.xyAngle/PI) + ")");
}

function rotateCamera(e)
{
  var xDelta = (e.clientX - sessionData.startX)/180;
  var yDelta = (e.clientY - sessionData.startY)/180;

  sessionData.startX = e.clientX;
  sessionData.startY = e.clientY;

  if(sessionData.isCamRotating == true)
  {
    sessionData.xyAngle = (sessionData.xyAngle +  yDelta) % (2*PI);
    sessionData.yzAngle = (sessionData.yzAngle +  xDelta) % (2*PI);
    sessionData.xzAngle = (sessionData.yzAngle +  (PI/2)) % (2*PI);

    DebugInfo("rotateCamera: Camera.delta (" + xDelta + ", " + yDelta + ")");

    sceneData.viewMode = "Orthographic"; if(sessionData.viewCameraProps.viewPortCamPresp == true) { sceneData.viewMode = "Prespective"; }
    sceneData.viewMode = sceneData.viewMode + " View";
    $("#cameraStatus").html(sceneData.viewMode);
    sceneData.gridXY.visible = true; sceneData.gridXZ.visible = false; sceneData.gridYZ.visible = false;

    sessionData.viewCameraProps.camUp.set(0, 0, 1);
    applyRotation();

    /* Render again */
    render(true);
  }

  return false;
}

function getDistFromCurrSelObj(e, axis, normalize)
{
  var cam = getCurrentCamera();
  var zoomOffset = sessionData.viewCameraProps.zoomMultiplier * 3;
  var delta   = {x: 0, y: 0, z: 0};
  var xWeight = {x: 0, y: 0, z: 0};
  var yWeight = {x: 0, y: 0, z: 0};
  
  var delX = (sessionData.selObjLoc.x - e.offsetX) * zoomOffset;
  var delY = (e.offsetY - sessionData.selObjLoc.y) * zoomOffset;
  
  if(axis == 'x')
  {
    xWeight.x = Math.cos(sessionData.yzAngle);
    yWeight.x = Math.sin(sessionData.yzAngle) * Math.sign(Math.sin(sessionData.xyAngle));
  }
  else if(axis == 'y')
  {
    xWeight.y = -Math.sin(sessionData.yzAngle);
    yWeight.y = Math.cos(sessionData.yzAngle) * Math.sign(Math.sin(sessionData.xyAngle));
  }
  else if(axis == 'z')
  {
    xWeight.z = 0; yWeight.z = -1;
  }
  else
  {
    if(normalize == true)
    {
      xWeight = {x: 0.5, y: 0.5, z: 0.5};
      yWeight = {x: 0.5, y: 0.5, z: 0.5};
    }
    else
    {
      xWeight.x = Math.cos(sessionData.yzAngle);
      yWeight.x = Math.sin(sessionData.yzAngle) * Math.sign(Math.sin(sessionData.xyAngle));
      xWeight.y = -Math.sin(sessionData.yzAngle);
      yWeight.y = Math.cos(sessionData.yzAngle) * Math.sign(Math.sin(sessionData.xyAngle));
      xWeight.z = 0;
      yWeight.z = -1;
    }
  }
  
  delta.x = (xWeight.x * delX) + (yWeight.x * delY);
  delta.y = (xWeight.y * delX) + (yWeight.y * delY);
  delta.z = (xWeight.z * delX) + (yWeight.z * delY);
  
  if(normalize == true)
  {
    var maxDist = (((viewPort.width) > (viewPort.height)) ? (viewPort.width) : (viewPort.height));
    maxDist = maxDist *  zoomOffset;
    
    delta.x = delta.x / maxDist;
    delta.y = delta.y / maxDist;
    delta.z = delta.z / maxDist;
  }
  
  console.log("xWeight: {" + xWeight.x + ", " + xWeight.y + ", " + xWeight.z + "}");
  console.log("yWeight: {" + yWeight.x + ", " + yWeight.y + ", " + yWeight.z + "}");
  console.log("delta: {" + delta.x + ", " + delta.y + ", " + delta.z + "}");
  
  return delta;
}

function dragCurrElement(e)
{
  var selectedObj = getSelectedObject();
  if(sessionData.objSelect.isEdit == true) { selectedObj = getSelectedVef(); }
  var delta = getDistFromCurrSelObj(e, sessionData.selectData.direction, false);

  if((sessionData.selectData.isDragging == true) && (selectedObj != null))
  {
    selectedObj.position.x = sessionData.selObjPos.x + delta.x;
    selectedObj.position.y = sessionData.selObjPos.y + delta.y;
    selectedObj.position.z = sessionData.selObjPos.z + delta.z;

    updateObject();
    render(false);
  }
}

function scaleCurrElement(e)
{
  var selectedObj = getSelectedObject();
  if(sessionData.objSelect.isEdit == true) { selectedObj = null; }
  var delta = getDistFromCurrSelObj(e, sessionData.selectData.direction, true);

  if((sessionData.selectData.isScaling == true) && (selectedObj != null))
  {
    selectedObj.scale.x = sessionData.selObjScale.x * (((delta.x == 0)?(1):(0.1)) + (54 * Math.abs(delta.x)));
    selectedObj.scale.y = sessionData.selObjScale.y * (((delta.y == 0)?(1):(0.1)) + (54 * Math.abs(delta.y)));
    selectedObj.scale.z = sessionData.selObjScale.z * (((delta.z == 0)?(1):(0.1)) + (54 * Math.abs(delta.z)));
    
    render(false);
  }
}

function rotateCurrElement(e)
{
  var selectedObj = getSelectedObject();
  if(sessionData.objSelect.isEdit == true) { selectedObj = getSelectedVef(); /*no scalling for vertex/face/edge required */}
  var delta = getDistFromCurrSelObj(e, sessionData.selectData.direction, true);

  if((sessionData.selectData.isRotating == true) && (selectedObj != null))
  {
    selectedObj.rotation.x = sessionData.selObjRot.x + (delta.x * 2 * PI);
    selectedObj.rotation.y = sessionData.selObjRot.y + (delta.y * 2 * PI);
    selectedObj.rotation.z = sessionData.selObjRot.z + (delta.z * 2 * PI);
    
    render(false);
  }
}
