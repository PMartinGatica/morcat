/**
 * MORCAT — Liberación de recursos WebGL.
 * Dispose de geometrías, materiales, texturas y renderer.
 */
import * as THREE from 'three';

export function disposeObject3D(root: THREE.Object3D): void {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();

    const material = mesh.material;
    if (Array.isArray(material)) {
      material.forEach((m) => disposeMaterial(m));
    } else if (material) {
      disposeMaterial(material);
    }
  });
}

function disposeMaterial(material: THREE.Material): void {
  const mat = material as THREE.MeshBasicMaterial;
  // Texturas (si algún día se usan)
  const map = mat.map;
  if (map) map.dispose();
  material.dispose();
}

export function disposeRenderer(renderer: THREE.WebGLRenderer | null): void {
  if (!renderer) return;
  renderer.dispose();
  // Quita el canvas del DOM (lo reemplaza el fallback estático).
  const dom = renderer.domElement;
  dom.parentElement?.removeChild(dom);
}
