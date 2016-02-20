
function getScreenXY(obj)
{
  var p = obj.matrixWorld.getPosition().clone();
  p.project(getCurrentCamera());
  
  var xy = new THREE.Vector2();
  
  xy.x = (((p.x + 1) / 2) * viewPort.width);
  xy.y = (((-p.y + 1) / 2) * viewPort.height);
  
  return xy;
}

function getSceneXYZ(pos)
{
  var xyz = new THREE.Vector3();
  
  xyz.x = (((pos.x / viewPort.width) * 2) - 1);
  xyz.y = -(((pos.y / viewPort.height) * 2) - 1); 
  xyz.z = 0.5;
  
  xyz.unproject(getCurrentCamera());
  
  return xyz;
}
