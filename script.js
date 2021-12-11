console.clear();

const canvas = document.getElementById('canvas');
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, 1, 1000);

function onResize () {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  camera.aspect = canvas.clientWidth /  canvas.clientHeight;
  camera.updateProjectionMatrix();
}

onResize();
window.addEventListener('resize', onResize);

const imgTexture = new THREE.TextureLoader().load(
  "https://raw.githubusercontent.com/oh-bargain/liftoff/main/src/2x/Asset%2010%402x.png"
  );

var shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: document.getElementById('vertex-shader').textContent,
  fragmentShader: document.getElementById('fragment-shader').textContent,
  depthWrite: false,
  depthTest: false,
  uniforms: {
      image: {
        type: "t",
        value: imgTexture
      },
      time: {
        value: 0.0
      }
  }
})

var quad = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  shaderMaterial
);

scene.add(quad);

function render(time) {
  quad.material.uniforms.time.value += 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(render)