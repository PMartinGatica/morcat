/**
 * MORCAT — Control de cámara.
 * Deriva orbital lenta + paralaje mínimo al mouse + ligera
 * reacción al scroll (sin sacudidas).
 */
import * as THREE from 'three';

export interface CameraInput {
  /** Pointer normalizado en [-1, 1] */
  pointerX: number;
  pointerY: number;
  /** Scroll normalizado en [0, 1] */
  scroll: number;
}

export class CameraController {
  readonly camera: THREE.PerspectiveCamera;
  private basePos = new THREE.Vector3(5.4, 3.4, 6.6);
  private lookAt = new THREE.Vector3(0, 0.85, 0);
  private mouse = { x: 0, y: 0 };
  private current = { x: 0, y: 0 };
  private t = 0;

  constructor(aspect: number) {
    this.camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    this.camera.position.copy(this.basePos);
    this.camera.lookAt(this.lookAt);
  }

  resize(aspect: number): void {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  /** Actualiza con el tiempo transcurrido (s) y el input. */
  update(dt: number, input: CameraInput): void {
    this.t += dt;

    // Deriva orbital suave
    const driftX = Math.sin(this.t * 0.07) * 0.5;
    const driftY = Math.sin(this.t * 0.11) * 0.22;

    // Paralaje del mouse (lerp suave)
    this.mouse.x = input.pointerX;
    this.mouse.y = input.pointerY;
    this.current.x += (this.mouse.x - this.current.x) * Math.min(1, dt * 2.4);
    this.current.y += (this.mouse.y - this.current.y) * Math.min(1, dt * 2.4);

    // Scroll: se acerca y eleva levemente
    const dolly = 1 - input.scroll * 0.14;
    const lift = input.scroll * 0.5;

    this.camera.position.set(
      (this.basePos.x + driftX + this.current.x * 0.7) * dolly,
      (this.basePos.y + driftY - this.current.y * 0.4 + lift) * dolly,
      (this.basePos.z + this.current.x * 0.4) * dolly,
    );
    this.camera.lookAt(this.lookAt);
  }

  /** Posición estática para el frame inicial (reduced motion). */
  frameStatic(): void {
    this.camera.position.set(this.basePos.x, this.basePos.y, this.basePos.z);
    this.camera.lookAt(this.lookAt);
  }
}
