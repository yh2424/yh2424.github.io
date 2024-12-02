import gdsfactory as gf

#grating coupler 생성 함수
def create_grating_coupler(x, y, angle):
    gc = gf.components.grating_coupler_elliptical_te(x, y, angle)
    # gc.move((x, y))
    # gc.rotate(angle)
    return gc
#component move, rotate 함수
def move_rotate(com, x, y, angle):
    c = com
    c.rotate(angle)
    c.move(origin=(0,0), destination=(x,y))
    return c
#waveguide(straight) 생성 함수
def create_waveguide_straight(l, w):
    wg_st = gf.components.straight(length=l, width=w)
    return wg_st
#waveguide(bend euler) 생성 함수
def create_waveguide_bend(r, w, a):
    wg_b = gf.components.bend_euler(radius=r, width=w, angle=a, npoints=720, layer=(1,0))
    return wg_b
#mmi 생성 함수
def create_mmi():
    mmi = gf.components.mmi1x2()
    return mmi
#rectangle box 생성 함수
def create_rectangle(x,y,layer):
    rectangle = gf.components.rectangle(size=[x,y], layer=layer)
    return rectangle
#component에 port 생성 함수
def add_ports(name):
    base_name = name.name.split('(')[0]
    port_data = [(f'{base_name}_{i+1}', port_value) for i, (_, port_value) in enumerate(name.ports)]
    return port_data[0][0]