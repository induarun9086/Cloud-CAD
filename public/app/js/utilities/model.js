
function createGridLines(gridSize, numOfGridLines, numOfSubGridLines)
{
  var scale    = gridSize/numOfGridLines;
  var subScale = scale/numOfSubGridLines;
  var geometry = new THREE.Geometry();
  
  geometry.vertices.push(new THREE.Vector3( - gridSize/2, 0, 0 ) );
  geometry.vertices.push(new THREE.Vector3( gridSize/2, 0, 0 ) );

  linesMaterialX   = new THREE.LineBasicMaterial( { color: 0x990000, opacity: .3, linewidth: .2 } );
  linesMaterialY   = new THREE.LineBasicMaterial( { color: 0x009900, opacity: .3, linewidth: .2 } );
  linesMaterialZ   = new THREE.LineBasicMaterial( { color: 0x000099, opacity: .3, linewidth: .2 } );
  linesMaterial    = new THREE.LineBasicMaterial( { color: 0x333333, opacity: .3, linewidth: .2 } );
  sublinesMaterial = new THREE.LineBasicMaterial( { color: 0x121212, opacity: .1, linewidth: .1 } );
  planeMaterial    = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0 } );
  
  sceneData.gridXY = new THREE.Object3D();
  sceneData.gridXZ = new THREE.Object3D();
  sceneData.gridYZ = new THREE.Object3D();
  
  sceneData.gridXY.visible = true; sceneData.gridXZ.visible = false; sceneData.gridYZ.visible = false;
  sceneData.gridXY.name = "gridXY"; sceneData.gridXZ.name = "gridXZ"; sceneData.gridYZ.name = "gridYZ";
  
  sceneData.gridXYPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  sceneData.gridXZPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  sceneData.gridYZPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
  
  for ( var i = 0; i <= numOfGridLines; i ++ ) 
  {
      var linex = new THREE.Line( geometry, ((i == (numOfGridLines/2))?(linesMaterialX):(linesMaterial)) );
      linex.position.y = ( i * scale ) - (gridSize/2);
      sceneData.gridXY.add( linex );

      var liney = new THREE.Line( geometry, ((i == (numOfGridLines/2))?(linesMaterialY):(linesMaterial)) );
      liney.position.x = ( i * scale ) - (gridSize/2);
      liney.rotation.z = 90 * Math.PI / 180;
      sceneData.gridXY.add( liney );

      if(i >= numOfGridLines) break;

      for( var j = 1; j <= (numOfSubGridLines-1); j++)
      {
          var linesx = new THREE.Line( geometry, sublinesMaterial );
          linesx.position.y = linex.position.y + (j * subScale);
          sceneData.gridXY.add( linesx );

          var linesy = new THREE.Line( geometry, sublinesMaterial );
          linesy.position.x = liney.position.x + (j * subScale);
          linesy.rotation.z = 90 * Math.PI / 180;
          sceneData.gridXY.add( linesy );
      }
  }

  for ( var i = 0; i <= numOfGridLines; i ++ ) 
  {
    var linex = new THREE.Line( geometry, ((i == (numOfGridLines/2))?(linesMaterialX):(linesMaterial)) );
    linex.position.z = ( i * scale ) - (gridSize/2);
    sceneData.gridXZ.add( linex );

    var linez = new THREE.Line( geometry, ((i == (numOfGridLines/2))?(linesMaterialZ):(linesMaterial)) );
    linez.position.x = ( i * scale ) - (gridSize/2);
    linez.rotation.y = 90 * Math.PI / 180;
    sceneData.gridXZ.add( linez );

    if(i >= numOfGridLines) break;

    for( var j = 1; j <= (numOfSubGridLines-1); j++)
    {
      var linesx = new THREE.Line( geometry, sublinesMaterial );
      linesx.position.z = linex.position.z + (j * subScale);
      sceneData.gridXZ.add( linesx );
      
      var linesz = new THREE.Line( geometry, sublinesMaterial );
      linesz.position.x = linez.position.x + (j * subScale);
      linesz.rotation.y = 90 * Math.PI / 180;
      sceneData.gridXZ.add( linesz );
    }
  }
  
  for ( var i = 0; i <= numOfGridLines; i ++ ) 
  {
    var liney = new THREE.Line( geometry, ((i == (numOfGridLines/2))?(linesMaterialY):(linesMaterial)) );
    liney.position.z = ( i * scale ) - (gridSize/2);
    liney.rotation.z = 90 * Math.PI / 180;
    sceneData.gridYZ.add( liney );

    var linez = new THREE.Line( geometry, ((i == (numOfGridLines/2))?(linesMaterialZ):(linesMaterial)) );
    linez.position.y = ( i * scale ) - (gridSize/2);
    linez.rotation.y = 90 * Math.PI / 180;
    sceneData.gridYZ.add( linez );

    if(i >= numOfGridLines) break;

    for( var j = 1; j <= (numOfSubGridLines-1); j++)
    {
      var linesy = new THREE.Line( geometry, sublinesMaterial );
      linesy.position.z = liney.position.z + (j * subScale);
      linesy.rotation.z = 90 * Math.PI / 180;
      sceneData.gridYZ.add( linesy );
      
      var linesz = new THREE.Line( geometry, sublinesMaterial );
      linesz.position.y = linez.position.y + (j * subScale);
      linesz.rotation.y = 90 * Math.PI / 180;
      sceneData.gridYZ.add( linesz );
    }
  }
  
  /* Add the grids to the scene */
  sceneData.viewPortScene.add(sceneData.gridXY);
  sceneData.viewPortScene.add(sceneData.gridXZ);
  sceneData.viewPortScene.add(sceneData.gridYZ);
}

function createVisualAids(size)
{
  var geometry;
  
  sceneData.cursor = new THREE.Object3D();
  
  linesMaterial  = new THREE.LineBasicMaterial( { color: 0xffffff, opacity: .3, linewidth: 1 } );
  linesMaterialX = new THREE.LineBasicMaterial( { color: 0x00ffff, opacity: .9, linewidth: 1 } );
  linesMaterialY = new THREE.LineBasicMaterial( { color: 0xff00ff, opacity: .9, linewidth: 1 } );
  linesMaterialZ = new THREE.LineBasicMaterial( { color: 0xffff00, opacity: .9, linewidth: 1 } );
  
  sceneData.selectAxis.localAxis = new THREE.Object3D();
  
  geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( -size, 0, 0 ) );
  geometry.vertices.push(new THREE.Vector3( size, 0, 0 ) );
  sceneData.selectAxis.localXAxis = new THREE.Line( geometry, linesMaterialX );
  sceneData.selectAxis.localAxis.add(new THREE.Line( geometry, linesMaterialX ));
  
  geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, -size, 0 ) );
  geometry.vertices.push(new THREE.Vector3( 0, size, 0 ) );
  sceneData.selectAxis.localYAxis = new THREE.Line( geometry, linesMaterialY );
  sceneData.selectAxis.localAxis.add(new THREE.Line( geometry, linesMaterialY ));
  
  geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, 0, -size ) );
  geometry.vertices.push(new THREE.Vector3( 0, 0, size ) );
  sceneData.selectAxis.localZAxis = new THREE.Line( geometry, linesMaterialZ );
  sceneData.selectAxis.localAxis.add(new THREE.Line( geometry, linesMaterialZ ));
  
  geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( -15, 0, 0 ) );
  geometry.vertices.push(new THREE.Vector3( 15, 0, 0 ) );
  var curX = new THREE.Line( geometry, linesMaterialX );
  geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, -15, 0 ) ); 
  geometry.vertices.push(new THREE.Vector3( 0, 15, 0 ) );
  var curY = new THREE.Line( geometry, linesMaterialY );
  geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3( 0, 0, -15 ) );
  geometry.vertices.push(new THREE.Vector3( 0, 0, 15 ) );
  var curZ = new THREE.Line( geometry, linesMaterialZ );
  
  /* Add the cursor to the scene */
  sceneData.cursor.add(curX); sceneData.cursor.add(curY); sceneData.cursor.add(curZ);
  
  sceneData.cursor.name = "cursor";
  sceneData.viewPortScene.add(sceneData.cursor);
}

function normalizeObjects(obj)
{
  /* Re-set the operations */
  sceneData.isEditDone = false;
  sceneData.isObjSelectDone = false;
  sceneData.isVefSelectDone = false;
  
  /* Remove object root from scene */
  sceneData.viewPortScene.remove(sceneData.objroot);

  /* Convert objects to string and back to 3D Objects (i.e. Now with generic geometry */
  sceneData.objroot = sceneData.loader.parse(sceneData.exporter.parse(sceneData.objroot));
  sceneData.objroot.name = 'objroot';
  
  /* Add it back to the scene */
  sceneData.viewPortScene.add(sceneData.objroot);
  
  /* Re-select the object if required */
  selectObject(false);
  
  /* Re-enter edit mode if required */
  enterEditMode(false);
  
  /* Re-select the vef if required */
  selectVef(false);
}

function createCube()
{
  var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x999999, wireframe: false});
  cube = new THREE.Mesh(new THREE.BoxGeometry(90, 90, 90), cubeMaterial);
  cube.position.set(sceneData.cursor.position.x, sceneData.cursor.position.y, sceneData.cursor.position.z);
  cube.rotation.set(0, 0, 0);
  
  cube.name = "cube" + sessionData.numCubes++;
  sceneData.objroot.add(cube);
  render(true);
  saveStep('Added-Cube');
}

function createSphere()
{
  var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x999999, wireframe: false});
  sphere = new THREE.Mesh(new THREE.SphereGeometry(50, 16, 16), sphereMaterial);
  sphere.position.set(sceneData.cursor.position.x, sceneData.cursor.position.y, sceneData.cursor.position.z);
  sphere.rotation.set(0, 0, 0);
  
  sphere.name = "sphere" + sessionData.numSpehers++;
  sceneData.objroot.add(sphere);
  render(true);
  saveStep('Added-Sphere');
}

function createCylinder()
{
  var cylinderMaterial = new THREE.MeshLambertMaterial( {color: 0x999999, wireframe: false} );
  cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 50, 50, 200, 32 ), cylinderMaterial );
  cylinder.position.set(sceneData.cursor.position.x, sceneData.cursor.position.y, sceneData.cursor.position.z);
  cylinder.rotation.set(0, 0, 0);

  cylinder.name = "cylinder" + sessionData.numCylinders++;
  sceneData.objroot.add(cylinder);
  render(true);
  saveStep('Added-Cylinder');
}

function createCone()
{
  var coneMaterial = new THREE.MeshLambertMaterial( {color: 0x999999, wireframe: false} );
  cone = new THREE.Mesh(new THREE.CylinderGeometry( 0, 50, 200, 32,false), coneMaterial );
  cone.position.set(sceneData.cursor.position.x, sceneData.cursor.position.y, sceneData.cursor.position.z);
  cone.rotation.set(0, 0, 0);

  cone.name = "cone" + sessionData.numCones++;
  sceneData.objroot.add(cone);
  render(true);
  saveStep('Added-Cone');
}

function getChildObjectByName(obj, objName)
{
  for(var i = 0; i < obj.children.length; i++)
  {
    if(obj.children[i].name == objName)
    {
      return obj.children[i];
    }
    else
    {
      var retObj = getChildObjectByName(obj.children[i], objName);
      
      if(retObj != null)
      {
        return retObj;
      }
    }
  }
  
  return null;
}

function getObjectByName(objName)
{
  return getChildObjectByName(sceneData.objroot, objName);
}

function getSelectedObject()
{
  if(sessionData.objSelect.isSelected == true)
  {
    return getObjectByName(sessionData.objSelect.objName);
  }
  
  return null;
}

function getSelectedObjectOutline()
{
  if(sessionData.objSelect.isSelected == true)
  {
    return getObjectByName(sessionData.objSelect.objName + '_outline');
  }
  
  return null;
}

function getSelectedVef()
{
  if(sessionData.vefSelect.isSelected == true)
  {
    return getObjectByName(sessionData.vefSelect.objName);
  }
  
  return null;
}

function selectObject(forceSelect)
{
  var selectedObj = getObjectByName(sessionData.objSelect.objName);
  
  if(selectedObj != null)
  {
    if(forceSelect == true)
    {
      sessionData.objSelect.isSelected = true;
      sessionData.selObjLoc     = getScreenXY(selectedObj);
      sessionData.selObjPos.x   = selectedObj.position.x;
      sessionData.selObjPos.y   = selectedObj.position.y;
      sessionData.selObjPos.z   = selectedObj.position.z;
      sessionData.selObjScale.x = selectedObj.scale.x;
      sessionData.selObjScale.y = selectedObj.scale.y;
      sessionData.selObjScale.z = selectedObj.scale.z;
      sessionData.selObjRot.x   = selectedObj.rotation.x;
      sessionData.selObjRot.y   = selectedObj.rotation.y;
      sessionData.selObjRot.z   = selectedObj.rotation.z;
    }

    if((sessionData.objSelect.isSelected == true) && (sceneData.isObjSelectDone == false))
    {
      sceneData.isObjSelectDone = true;
      
      var outlineMaterial  = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.BackSide , wireframe: false} );
      var outline = new THREE.Mesh(selectedObj.geometry, outlineMaterial);
      outline.scale.multiplyScalar(1.01);
      outline.position = selectedObj.position;
      outline.name = selectedObj.name + "_outline";
      outline.userData.tempObject = true;
      selectedObj.add(outline);
   
      selectedObj.material.wireframe = sessionData.objSelect.wireframeMode;
      outline.material.wireframe     = sessionData.objSelect.wireframeMode;
    }
  }
}

function resetObject(selectedObj)
{
  if((selectedObj == null) || (selectedObj == undefined))
  {
    if(sessionData.objSelect.isEdit == false)
    {
      selectedObj = getSelectedObject();
    }
    else
    {
      selectedObj = getSelectedVef();
    }
  }
  
  /* Re-set the selected object parameters */
  selectedObj.position.set(sessionData.selObjPos.x, sessionData.selObjPos.y, sessionData.selObjPos.z);
  selectedObj.scale.set(sessionData.selObjScale.x, sessionData.selObjScale.y, sessionData.selObjScale.z);
  selectedObj.rotation.set(sessionData.selObjRot.x, sessionData.selObjRot.y, sessionData.selObjRot.z);
}

function unSelectObject(allSelection, resetObj)
{
  var selectedObj = getSelectedObject();
  var selectObjOutline = getSelectedObjectOutline();
  
  if((sessionData.objSelect.isEdit == true) || (allSelection == true))
  {
    unselectVef(resetObj);
  }
  
  if((sessionData.objSelect.isEdit == false) || (allSelection == true))
  {
    if(selectedObj != null)
    {
      selectedObj.remove(selectObjOutline);
    }
    sessionData.objSelect.isSelected = false;
    sessionData.objSelect.objName = '';
    sceneData.isObjSelectDone = false;
    
    if(resetObj == true)
    {
      /* Re-set the selected object parameters */
      resetObject(selectedObj);
    }
  }

  sessionData.selectData.isRotating = false;
  sessionData.selectData.isScaling  = false;
  sessionData.selectData.isDragging = false;
  
  sceneData.viewPortScene.remove(sceneData.selectAxis.currLocalAxis);
  sceneData.selectAxis.currLocalAxis = null;
}

function isEdgeSame(ref, edge)
{
  var same = false;
  
  if((ref.geometry.vertices[0].x == edge.geometry.vertices[0].x) &&
     (ref.geometry.vertices[0].y == edge.geometry.vertices[0].y) &&
     (ref.geometry.vertices[0].z == edge.geometry.vertices[0].z) &&
     (ref.geometry.vertices[1].x == edge.geometry.vertices[1].x) &&
     (ref.geometry.vertices[1].y == edge.geometry.vertices[1].y) &&
     (ref.geometry.vertices[1].z == edge.geometry.vertices[1].z))
  {
    same = true;
  }
  
  if((ref.geometry.vertices[0].x == edge.geometry.vertices[1].x) &&
     (ref.geometry.vertices[0].y == edge.geometry.vertices[1].y) &&
     (ref.geometry.vertices[0].z == edge.geometry.vertices[1].z) &&
     (ref.geometry.vertices[1].x == edge.geometry.vertices[0].x) &&
     (ref.geometry.vertices[1].y == edge.geometry.vertices[0].y) &&
     (ref.geometry.vertices[1].z == edge.geometry.vertices[0].z))
  {
    same = true;
  }
  
  return same;
}

function enterEditMode(forceEdit)
{
  var selectedObj = getSelectedObject();
  var selectObjOutline = getSelectedObjectOutline();
  
  if(forceEdit == true)
  {
    sessionData.objSelect.isEdit = true;
  }
  
  if((sessionData.objSelect.isEdit == true) &&
     (sceneData.isEditDone == false))
  {
    sceneData.isEditDone = true;
    selectObjOutline.visible = false;
    
    if(sessionData.objSelect.editMode == 'v')
    {
      var vertices  = selectedObj.geometry.vertices;
      for (var i = 0; i < vertices.length; i++)
      {
        var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
        var sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 6, 6), sphereMaterial);
        sphere.position.set(vertices[i].x,vertices[i].y,vertices[i].z);
        sphere.rotation.set(0, 0, 0);
        sphere.name = selectedObj.name + "_vert_" + i;
        sphere.userData.tempObject = true;
        selectedObj.add(sphere);
      }
    }
    else if(sessionData.objSelect.editMode == 'e')
    {
      var vertices = selectedObj.geometry.vertices;
      var faces = selectedObj.geometry.faces;
      var edges = new Array();
      var edgeNames = new Array();
      var edgeGeo = new THREE.Geometry();
      
      for (var i = 0; i < faces.length; i++)
      {
        if(faces[i] instanceof THREE.Face3)
        {
          edgeGeo = new THREE.Geometry();
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].a].x , vertices[faces[i].a].y, vertices[faces[i].a].z));
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].b].x , vertices[faces[i].b].y, vertices[faces[i].b].z));
          edges.push(new THREE.Line(edgeGeo, new THREE.LineBasicMaterial({color: 0x000000})));
          edgeNames.push("_" + faces[i].a + "_" + faces[i].b);
          
          edgeGeo = new THREE.Geometry();
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].b].x , vertices[faces[i].b].y, vertices[faces[i].b].z));
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].c].x , vertices[faces[i].c].y, vertices[faces[i].c].z));
          edges.push(new THREE.Line(edgeGeo, new THREE.LineBasicMaterial({color: 0x000000})));
          edgeNames.push("_" + faces[i].b + "_" + faces[i].c);
          
          edgeGeo = new THREE.Geometry();
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].c].x , vertices[faces[i].c].y, vertices[faces[i].c].z));
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].a].x , vertices[faces[i].a].y, vertices[faces[i].a].z));
          edges.push(new THREE.Line(edgeGeo, new THREE.LineBasicMaterial({color: 0x000000})));
          edgeNames.push("_" + faces[i].c + "_" + faces[i].a);
        }
        else if(faces[i] instanceof THREE.Face4)
        {
          edgeGeo = new THREE.Geometry();
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].a].x , vertices[faces[i].a].y, vertices[faces[i].a].z));
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].b].x , vertices[faces[i].b].y, vertices[faces[i].b].z));
          edges.push(new THREE.Line(edgeGeo, new THREE.LineBasicMaterial({color: 0x000000})));
          edgeNames.push("_" + faces[i].a + "_" + faces[i].b);
          
          edgeGeo = new THREE.Geometry();
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].b].x , vertices[faces[i].b].y, vertices[faces[i].b].z));
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].c].x , vertices[faces[i].c].y, vertices[faces[i].c].z));
          edges.push(new THREE.Line(edgeGeo, new THREE.LineBasicMaterial({color: 0x000000})));
          edgeNames.push("_" + faces[i].b + "_" + faces[i].c);
          
          edgeGeo = new THREE.Geometry();
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].c].x , vertices[faces[i].c].y, vertices[faces[i].c].z));
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].d].x , vertices[faces[i].d].y, vertices[faces[i].d].z));
          edges.push(new THREE.Line(edgeGeo, new THREE.LineBasicMaterial({color: 0x000000})));
          edgeNames.push("_" + faces[i].c + "_" + faces[i].d);
          
          edgeGeo = new THREE.Geometry();
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].d].x , vertices[faces[i].d].y, vertices[faces[i].d].z));
          edgeGeo.vertices.push(new THREE.Vector3(vertices[faces[i].a].x , vertices[faces[i].a].y, vertices[faces[i].a].z));
          edges.push(new THREE.Line(edgeGeo, new THREE.LineBasicMaterial({color: 0x000000})));
          edgeNames.push("_" + faces[i].d + "_" + faces[i].a);
        }
        else
        {
          faceValid = false;
        }
      }
      
      for (var i = 0; i < edges.length; i++)
      {
        var edge = edges[i];
        var found = false;
        
        for(var j = 0; ((j < i) && (found == false)); j++)
        {
          found = isEdgeSame(edges[j], edge);
        }
        
        if(found == false)
        {
          edge.position.set(0, 0, 0);
          edge.rotation.set(0, 0, 0);
          edge.name = selectedObj.name + "_edge" + edgeNames[i];
          edge.userData.tempObject = true;
          selectedObj.add(edge);
        }
      }
    }
    else if(sessionData.objSelect.editMode == 'f')
    {
      var vertices = selectedObj.geometry.vertices;
      var faces = selectedObj.geometry.faces;
      var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x000000, wireframe: false});
      
      for (var i = 0; i < faces.length; i++)
      {
        var faceGeo = new THREE.Geometry();
        var faceValid = true;
        var edge;
        var faceName = '';
        var faceCenter = {x: 0, y: 0, z: 0};
        
        if(faces[i] instanceof THREE.Face3)
        {
          faceGeo.vertices.push(new THREE.Vector3(vertices[faces[i].a].x , vertices[faces[i].a].y, vertices[faces[i].a].z));
          faceGeo.vertices.push(new THREE.Vector3(vertices[faces[i].b].x , vertices[faces[i].b].y, vertices[faces[i].b].z));
          faceGeo.vertices.push(new THREE.Vector3(vertices[faces[i].c].x , vertices[faces[i].c].y, vertices[faces[i].c].z));
          faceName = "_" + faces[i].a + "_" + faces[i].b + "_" + faces[i].c + "_x";
          
          faceGeo.faces.push(new THREE.Face3(0, 1, 2, faces[i].normal, 0xffffff, 0));
          
          edge = new THREE.Line(faceGeo, new THREE.LineBasicMaterial({color: 0x000000}));
          
          faceCenter.x = (vertices[faces[i].a].x + vertices[faces[i].b].x + vertices[faces[i].c].x) / 3;
          faceCenter.y = (vertices[faces[i].a].y + vertices[faces[i].b].y + vertices[faces[i].c].y) / 3;
          faceCenter.z = (vertices[faces[i].a].z + vertices[faces[i].b].z + vertices[faces[i].c].z) / 3;
        }
        else if(faces[i] instanceof THREE.Face4)
        {
          faceGeo.vertices.push(new THREE.Vector3(vertices[faces[i].a].x , vertices[faces[i].a].y, vertices[faces[i].a].z));
          faceGeo.vertices.push(new THREE.Vector3(vertices[faces[i].b].x , vertices[faces[i].b].y, vertices[faces[i].b].z));
          faceGeo.vertices.push(new THREE.Vector3(vertices[faces[i].c].x , vertices[faces[i].c].y, vertices[faces[i].c].z));
          faceGeo.vertices.push(new THREE.Vector3(vertices[faces[i].d].x , vertices[faces[i].d].y, vertices[faces[i].d].z));
          faceName = "_" + faces[i].a + "_" + faces[i].b + "_" + faces[i].c + "_" + faces[i].d;
          
          faceGeo.faces.push(new THREE.Face4(0, 1, 2, 3, faces[i].normal, 0xffffff, 0));
          
          edge = new THREE.Line(faceGeo, new THREE.LineBasicMaterial({color: 0x000000}));
          
          faceCenter.x = (vertices[faces[i].a].x + vertices[faces[i].b].x + vertices[faces[i].c].x + vertices[faces[i].d].x) / 4;
          faceCenter.y = (vertices[faces[i].a].y + vertices[faces[i].b].y + vertices[faces[i].c].y + vertices[faces[i].d].y) / 4;
          faceCenter.z = (vertices[faces[i].a].z + vertices[faces[i].b].z + vertices[faces[i].c].z + vertices[faces[i].d].z) / 4;
        }
        else
        {
          faceValid = false;
        }
        
        if(faceValid == true)
        {
          var faceMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
          var face = new THREE.Mesh(faceGeo, faceMaterial);
          var sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 6, 6), sphereMaterial);
          face.position.set(0, 0, 0);
          face.rotation.set(0, 0, 0);
          sphere.position.set(faceCenter.x, faceCenter.y, faceCenter.z);
          face.name = selectedObj.name + "_face" + faceName;
          face.userData.tempObject = true;
          edge.userData.tempObject = true;
          sphere.userData.tempObject = true;
          face.add(sphere);
          face.add(edge);
          selectedObj.add(face);
        }
      }
    }
    else
    {
      
    }
  }
}

function leaveEditMode()
{
  if(sessionData.objSelect.isEdit == true)
  {
    /* Unselect any selection in edit mode */
    unSelectObject(false, true);
  }
  
  var selectedObj = getSelectedObject();
  var selectObjOutline = getSelectedObjectOutline();

  var length = selectedObj.children.length;
  for (var i = length; i >= 0; i --)
  {
    if(selectedObj.children[i] != selectObjOutline)
    {
      selectedObj.remove(selectedObj.children[i]);
    }
  }
  
  sessionData.objSelect.isEdit = false;
  selectObjOutline.visible = true;
  sceneData.isEditDone = false;
}

function selectVef(forceSelect)
{
  var selectedObj = getObjectByName(sessionData.objSelect.objName);
  
  if((selectedObj != null) && (sessionData.objSelect.isEdit == true))
  {
    var selectedVef = getObjectByName(sessionData.vefSelect.objName);
    
    if(selectedVef != null)
    {
      if(forceSelect == true)
      {
        sessionData.vefSelect.isSelected = true;
        
        sessionData.selObjLoc     = getScreenXY(selectedVef);
        sessionData.selObjPos.x   = selectedVef.position.x;
        sessionData.selObjPos.y   = selectedVef.position.y;
        sessionData.selObjPos.z   = selectedVef.position.z;
        sessionData.selObjScale.x = selectedVef.scale.x;
        sessionData.selObjScale.y = selectedVef.scale.y;
        sessionData.selObjScale.z = selectedVef.scale.z;
        sessionData.selObjRot.x   = selectedVef.rotation.x;
        sessionData.selObjRot.y   = selectedVef.rotation.y;
        sessionData.selObjRot.z   = selectedVef.rotation.z;
      }

      if((sessionData.vefSelect.isSelected == true) && (sceneData.isVefSelectDone == false))
      {
        sceneData.isVefSelectDone = true;
        
        selectedVef.material.color.setHex(0xff0000);
        
        sessionData.selObjPos.x   = selectedVef.position.x;
        sessionData.selObjPos.y   = selectedVef.position.y;
        sessionData.selObjPos.z   = selectedVef.position.z;
      }
    }
  }
}

function unselectVef(resetObj)
{
  selectedVef = getSelectedVef();
    
  if(selectedVef != null)
  {
    selectedVef.material.color.setHex(0xffffff);
  
    if(resetObj == true)
    {
      /* Re-set the selected vertex parameters */
      if(sessionData.objSelect.editMode =='v')
      {
        selectedVef.position.set(sessionData.selObjPos.x, sessionData.selObjPos.y, sessionData.selObjPos.z);
        selectedVef.rotation.set(sessionData.selObjRot.x, sessionData.selObjRot.y, sessionData.selObjRot.z);
        
        updateObject();
      }
    }
  }
  
  sessionData.vefSelect.isSelected = false;
  sessionData.vefSelect.objName = '';
  sceneData.isVefSelectDone = false;
}

function updateObject()
{
  var selectedObj = getSelectedObject();
  
  if((sessionData.vefSelect.isSelected == true) && (sessionData.objSelect.isEdit == true))
  {
    if(sessionData.objSelect.editMode == 'v')
    {
      var idx  = parseInt((sessionData.vefSelect.objName.split('_'))[2]);
      var vert = getObjectByName(sessionData.vefSelect.objName);
      
      selectedObj.geometry.vertices[idx].x = vert.position.x;
      selectedObj.geometry.vertices[idx].y = vert.position.y;
      selectedObj.geometry.vertices[idx].z = vert.position.z;
      
      selectedObj.geometry.verticesNeedUpdate = true;
    }
    else if(sessionData.objSelect.editMode == 'e')
    {
      var idx  = new Array(); 
      idx[0]   = parseInt((sessionData.vefSelect.objName.split('_'))[2]);
      idx[1]   = parseInt((sessionData.vefSelect.objName.split('_'))[3]);
      var edge = getObjectByName(sessionData.vefSelect.objName);
      
      var vertices = edge.geometry.vertices;
      
      for(var i = 0; i < idx.length; i++)
      {
        selectedObj.geometry.vertices[idx[i]].x = (vertices[i].x + edge.position.x);
        selectedObj.geometry.vertices[idx[i]].y = (vertices[i].y + edge.position.y);
        selectedObj.geometry.vertices[idx[i]].z = (vertices[i].z + edge.position.z);
      }
      
      selectedObj.geometry.verticesNeedUpdate = true;
    }
    else if(sessionData.objSelect.editMode == 'f')
    {
      var idx  = new Array(); 
      idx[0]   = parseInt((sessionData.vefSelect.objName.split('_'))[2]);
      idx[1]   = parseInt((sessionData.vefSelect.objName.split('_'))[3]);
      idx[2]   = parseInt((sessionData.vefSelect.objName.split('_'))[4]);
      if((sessionData.vefSelect.objName.split('_'))[5] != 'x')
      {
        idx[3]   = parseInt((sessionData.vefSelect.objName.split('_'))[5]);
      }
      var face = getObjectByName(sessionData.vefSelect.objName);
      
      var vertices = face.geometry.vertices;
      
      for(var i = 0; i < idx.length; i++)
      {
        selectedObj.geometry.vertices[idx[i]].x = (vertices[i].x + face.position.x);
        selectedObj.geometry.vertices[idx[i]].y = (vertices[i].y + face.position.y);
        selectedObj.geometry.vertices[idx[i]].z = (vertices[i].z + face.position.z);
      }
      
      selectedObj.geometry.verticesNeedUpdate = true;
    }
    else
    {
      
    }
  }
}