import gsap from "gsap";

interface DeviceOrientationEventWithPermission extends DeviceOrientationEvent {
  requestPermission?: () => Promise<PermissionState>;
}

const UPDATE = (event: MouseEvent) => {
  const { clientX: x, clientY: y } = event;
  gsap.set(document.documentElement, {
    "--x": gsap.utils.mapRange(0, window.innerWidth, -1, 1, x),
    "--y": gsap.utils.mapRange(0, window.innerHeight, -1, 1, y),
  });
};

const handleOrientation = (event: DeviceOrientationEvent) => {
  const { beta, gamma } = event;
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  gsap.set(document.documentElement, {
    "--x": gsap.utils.clamp(
      -1,
      1,
      isLandscape
        ? gsap.utils.mapRange(-45, 45, -1, 1, beta!)
        : gsap.utils.mapRange(-45, 45, -1, 1, gamma!)
    ),
    "--y": gsap.utils.clamp(
      -1,
      1,
      isLandscape
        ? gsap.utils.mapRange(20, 70, 1, -1, Math.abs(gamma!))
        : gsap.utils.mapRange(20, 70, 1, -1, beta!)
    ),
  });
};

const START = () => {
  const DeviceOrientationEventWithPermission =
    DeviceOrientationEvent as unknown as DeviceOrientationEventWithPermission;
  if (DeviceOrientationEventWithPermission?.requestPermission) {
    Promise.all([
      DeviceOrientationEventWithPermission.requestPermission(),
    ]).then((results) => {
      if (results.every((result) => result === "granted")) {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    });
  } else {
    window.addEventListener("deviceorientation", handleOrientation);
  }
};

export const initCardParallax = () => {
  window.addEventListener("mousemove", UPDATE);
  document.body.addEventListener("click", START, { once: true });
};
