package org.cube;

public class Cube {
    int[][][] color = new int[6][3][3];
    
    void init() {
        for(int s = 0; s < 6; s++) {
            for(int x=0; x<3; x++) {
                for(int y=0; y<3; y++) {
                    color[s][x][y] = s;
                }
            }
        }
    }
    
    public String toString() {
        StringBuilder buff = new StringBuilder();
        buff.append("    ");
        int s = 4;
        for(int y=0; y<3; y++) {
            for(int x=0; x<3; x++) {
                buff.append((char) ('0' + color[s][x][y]));
            }
            buff.append('\n');
        }
        buff.append('\n');
        for(int y=0; y<3; y++) {
            for(s = 0; s < 4; s++) {
                for(int x=0; x<3; x++) {
                    buff.append((char) ('0' + color[s][x][y]));
                }
                buff.append('\n');
            }
        }
        return buff.toString();
    }
}
