import { Vector3 } from 'three'

export function distance2D(x1: number, z1: number, x2: number, z2: number): number {
  const dx = x2 - x1
  const dz = z2 - z1
  return Math.sqrt(dx * dx + dz * dz)
}

export function distance3D(pos1: Vector3, pos2: Vector3): number {
  return pos1.distanceTo(pos2)
}

export function isWithinRadius(
  x1: number,
  z1: number,
  x2: number,
  z2: number,
  radius: number
): boolean {
  return distance2D(x1, z1, x2, z2) <= radius
}

export function clampPosition(
  x: number,
  z: number,
  minX: number,
  maxX: number,
  minZ: number,
  maxZ: number
): { x: number; z: number } {
  return {
    x: Math.max(minX, Math.min(maxX, x)),
    z: Math.max(minZ, Math.min(maxZ, z)),
  }
}

export interface Obstacle {
  x: number
  z: number
  radius: number
}

export function checkCollisionWithObstacles(
  newX: number,
  newZ: number,
  obstacles: Obstacle[],
  avatarRadius: number
): boolean {
  for (const obstacle of obstacles) {
    const dist = distance2D(newX, newZ, obstacle.x, obstacle.z)
    if (dist < obstacle.radius + avatarRadius) {
      return true // Collision detected
    }
  }
  return false
}
