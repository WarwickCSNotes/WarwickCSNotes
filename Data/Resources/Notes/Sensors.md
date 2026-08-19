*"One of the most important tasks of an autonomous system of any kind is to acquire knowledge about its environment. This is done by taking measurements using various sensors and then extracting meaningful information from those measurements." - Introduction to Autonomous Mobile Robots*

You acquire knowledge about the environment through the data that sensors give you. 

We will classify sensors and note the limitations of sensors; it's important to remember **sensors are imperfect** leading to inaccurate data - much of later content is on dealing with this error.

## Proprioceptive vs Exteroceptive

Sensors are split by *what* they measure:

- **Proprioceptive (internal):** measures internal values, e.g. the robot's power consumption, direction, or speed.
- **Exteroceptive (external):** measures information from the robot's environment, e.g. a camera looking at the world, a sonar pinging a wall.

## Active vs Passive

Sensors are also split by *where the energy comes from*:

- **Passive:** the energy comes from the environment. The sensor just receives whatever's already there (a microphone, a camera in ambient light, a thermometer).
- **Active:** the sensor emits energy and measures what comes back. Examples include ultrasonic rangefinders, LIDAR, and active infrared sensors.

>[!warning]- Active Sensors can affect what they're measuring
> Because an active sensor pumps energy into the environment to take a reading, it can also influence the very thing it's trying to measure. A simple example: an ultrasonic sensor's pulses can be detected by another nearby ultrasonic sensor.
>
> A related failure mode is **cross-contamination** between active sensors. If sensors $A$ and $B$ both emit, they may pick up each other's pulses instead of (or as well as) their own returns, producing bogus readings. $A$ and $B$ can be on the same robot *or* on different robots in the same area - either case is enough to corrupt the measurement.

>[!warning]- Vision-Based Sensing is cheap on hardware, expensive on compute
> Cameras themselves are cheap and tiny, which is why vision-based sensing is attractive on hobbyist and consumer robots. But the *processing* required to extract useful information from a camera feed (edge detection, feature extraction, classification, depth from stereo, etc.) is computationally expensive.
>
> In other words, vision-based sensing shifts the cost from the *sensor* to the *compute*: your hardware (CPU/GPU/accelerator) has to be much better to keep up, so you don't actually escape the cost, you just move it.

## Accuracy and Error

Sensor error comes in two flavours:

- **Systematic:** predictable error caused by factors that can be modelled (e.g. a fixed calibration offset, a known temperature drift).
- **Random:** unpredictable error, but can be treated with probability (e.g. a noise distribution around the true reading).

>[!warning]- How do you get the "true value"?
> Talking about accuracy assumes you have a true value to compare a reading against, but for most quantities you'd actually want to measure, that's exactly the thing you don't have. So how do you get the true value to measure the accuracy of a sensor in the first place?
>
> Often there's no general answer, and you have to fall back on a **situation-specific** ground truth. For example, with a distance sensor, you can run it across a track with known distances marked along it, where the markings come from a more trusted in-person measurement (a ruler, a laser distance meter, etc.). The sensor's reading is then compared against those known-good values.
