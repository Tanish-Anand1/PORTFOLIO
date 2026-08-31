"""Render a lightweight Vivacity experiment plate.

Run from the repository root with:
    blender --background --python scripts/vivacity_blender_render.py

The output is one 960x540 WebP, intended to be lazy-loaded beside the live
browser simulation. No external textures or network assets are required.
"""
import math
from pathlib import Path

import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "portfolio" / "vivacity-blender.webp"


def material(name, color, emission=None, strength=0.0, metallic=0.0, roughness=0.5):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1.0)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1.0)
        bsdf.inputs["Emission Strength"].default_value = strength
    return mat


def point_at(obj, target=(0, 0, 0)):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


def curve(name, points, mat, bevel=0.012):
    data = bpy.data.curves.new(name, "CURVE")
    data.dimensions = "3D"
    data.bevel_depth = bevel
    data.bevel_resolution = 2
    spline = data.splines.new("POLY")
    spline.points.add(len(points) - 1)
    for item, point in zip(spline.points, points):
        item.co = (*point, 1)
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    return obj


def label(text, location, size, mat, rotation=(math.radians(72), 0, 0)):
    data = bpy.data.curves.new(text, "FONT")
    data.body = text
    data.align_x = "CENTER"
    data.size = size
    data.extrude = 0.001
    obj = bpy.data.objects.new(text, data)
    obj.location = location
    obj.rotation_euler = rotation
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    return obj


def node(location, mat, radius=0.035):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=radius, location=location)
    obj = bpy.context.object
    obj.data.materials.append(mat)
    return obj


# Clean deterministic scene.
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
for datablocks in (bpy.data.curves, bpy.data.meshes, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
    for block in list(datablocks):
        if block.users == 0:
            datablocks.remove(block)

ink = material("graphite", (0.008, 0.010, 0.012), metallic=0.65, roughness=0.27)
wire = material("instrument white", (0.20, 0.22, 0.22), emission=(0.12, 0.13, 0.12), strength=0.6)
amber = material("selected branch", (0.42, 0.23, 0.07), emission=(1.0, 0.31, 0.045), strength=3.5)
cyan = material("counterfactual", (0.03, 0.12, 0.16), emission=(0.01, 0.32, 0.48), strength=1.3)
muted = material("annotation", (0.11, 0.12, 0.12), emission=(0.08, 0.09, 0.09), strength=0.7)

# Central body with an actual latitude/longitude wireframe.
bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=1.22, location=(0, 0, 0))
body = bpy.context.object
body.name = "central-body-R1"
body.data.materials.append(ink)
wireframe = body.modifiers.new("latitude longitude observation", "WIREFRAME")
wireframe.thickness = 0.008
wireframe.use_replace = False
body.data.materials.append(wire)

# A restrained orbital lattice and three real counterfactual paths.
for radius in (1.75, 2.55, 3.35):
    points = [(radius * math.cos(t), radius * math.sin(t), 0) for t in [i * 2 * math.pi / 96 for i in range(97)]]
    curve(f"reference-{radius}", points, muted, 0.006)
for index, (radius, z, mat) in enumerate(((2.05, 0.03, amber), (2.05, 0.0, wire), (2.05, -0.03, cyan))):
    points = []
    for i in range(161):
        t = i * 2 * math.pi / 160
        # Slightly different eccentricities represent the three solver branches.
        r = radius + (index - 1) * 0.28 + 0.12 * math.cos(t)
        points.append((r * math.cos(t), r * math.sin(t), z + 0.22 * math.sin(t)))
    curve(f"branch-{index + 1}", points, mat, 0.018 if index == 0 else 0.009)
    for sample in (0, 40, 80, 120):
        node(points[sample], mat, 0.028 if index == 0 else 0.018)

# A vertical instrument panel gives the render a lab-plate reading without UI chrome.
panel_mat = material("panel", (0.012, 0.014, 0.015), metallic=0.1, roughness=0.7)
bpy.ops.mesh.primitive_cube_add(location=(4.45, 0.2, 0.15), scale=(0.02, 2.4, 2.65))
panel = bpy.context.object
panel.data.materials.append(panel_mat)
for i, (text, z, mat) in enumerate((("VIVACITY", 2.15, wire), ("EXPERIMENT 001", 1.85, amber), ("BRANCH / VERIFIED", 1.48, wire), ("dt 0.0125   mu 1", 1.12, muted), ("ENERGY RESIDUAL", 0.72, muted))):
    label(text, (4.35, -2.18, z), 0.18 if i < 2 else 0.115, mat, rotation=(math.radians(90), 0, math.radians(90)))
for i in range(7):
    y = -1.85 + i * 0.52
    curve(f"panel-readout-{i}", [(4.41, y, 0.1), (4.41, y + 0.27 * math.sin(i), 0.1)], amber if i == 5 else muted, 0.012)

# Camera and soft lighting keep the output dark while separating geometry.
bpy.ops.object.camera_add(location=(9.2, -12.5, 8.5))
camera = bpy.context.object
camera.data.type = "ORTHO"
camera.data.ortho_scale = 9.8
point_at(camera, (1.3, 0, 0.2))
bpy.context.scene.camera = camera
bpy.ops.object.light_add(type="AREA", location=(1.5, -4.5, 8))
bpy.context.object.data.energy = 500
bpy.context.object.data.shape = "DISK"
bpy.context.object.data.size = 7
point_at(bpy.context.object, (0, 0, 0))
bpy.ops.object.light_add(type="AREA", location=(-4, 3, 2))
bpy.context.object.data.energy = 180
bpy.context.object.data.size = 5
point_at(bpy.context.object, (0, 0, 0))

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.render.resolution_x = 960
scene.render.resolution_y = 540
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.color_mode = "RGB"
scene.render.image_settings.quality = 82
scene.render.filepath = str(OUTPUT)
scene.world.color = (0.001, 0.002, 0.003)
scene.view_settings.look = "AgX - Medium High Contrast"
scene.render.film_transparent = False
scene.render.image_settings.color_depth = "8"
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT / "scripts" / "vivacity-render.blend"))
bpy.ops.render.render(write_still=True)
print(f"Rendered {OUTPUT}")
