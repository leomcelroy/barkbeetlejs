This is a web-based CAM program that aims to simplify the process of generating toolpaths from SVGs.

A user only needs to input material and thickness and a milling settings calculator that uses the expertise of Jens Dyvik automatically generates feeds and speeds.

The program defaults to a machine with stiffness comparable to a Shopbot but I will add a stiffness variable soon.

Here is a video [demo](https://drive.google.com/file/d/1eN-_HpR6qWaZJw1ziHChJyFLJsClvapJ/view?usp=sharing).


TODO

- make sourceGeometry list of IDs
- fix delete toolpath when geometry deleted
- remove group leader and id
- fix edit vs create toolpath
- move toolpath eval to web worker
- make toolpaths take list of polylines
- take away metals if no ramping
- climb and conventional
- make pls the geometry representations