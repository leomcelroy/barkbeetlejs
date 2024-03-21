This is a web-based CAM program that aims to simplify the process of generating toolpaths from SVGs.

A user only needs to input material and thickness and a milling settings calculator that uses the expertise of Jens Dyvik automatically generates feeds and speeds.

The program defaults to a machine with stiffness comparable to a Shopbot but I will add a stiffness variable soon.

Here is a video [demo](https://drive.google.com/file/d/1eN-_HpR6qWaZJw1ziHChJyFLJsClvapJ/view?usp=sharing).


TODO

- [] save and upload
- [] move toolpath eval to web worker
- [] take away metals if no ramping
- [] climb and conventional
- [] add toolpath ordering
  - drag to reorder

MAYBE

- [] background grid

DONE

- [x] fix culling single point lines in affine transformations
- [x] make pls the geometry representations
- [x] make toolpaths take list of polylines
- [x] make sourceGeometry list of IDs
- [x] fix delete toolpath when geometry deleted
- [x] remove group leader and id
- [x] fix edit vs create toolpath
