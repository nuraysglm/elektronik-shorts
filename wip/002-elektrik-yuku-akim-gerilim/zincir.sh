#!/bin/bash
# parca-0$1 bitince parca-0$(($1+4)) render et
cd /home/user/elektronik-shorts
while [ ! -f wip/002-elektrik-yuku-akim-gerilim/parca-0$1.mp4 ]; do sleep 20; done
wip/002-elektrik-yuku-akim-gerilim/render_parts.sh $(($1+4)) $(($1+4))
