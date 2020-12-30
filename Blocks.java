import java.util.*;




public class Blocks {
    public static final int WIDTH = 10;
    public static final int HEIGHT = 20;
    // blocks: square, line, s, z, l, j, t

    String[][] grid;
    public Blocks(int w, int h){
        grid = initGrid(w, h);
    }
    
    public String[][] initGrid(int w, int h){
        String[][] grid = new String[w][h];
        for (int i = 0; i < w; ++i){
            for (int j = 0; j < h; ++j){
                grid[i][j] = " ";
            }
        }
        return grid;
    }
    public void printGrid(){
        for (int i = 0; i < grid.length + 2; ++i) System.out.print("#");
        System.out.println();
        for (int i = 0; i < grid[0].length; ++i){
            System.out.print("#");
            for (int j = 0; j < grid.length; ++j){
                System.out.print(grid[j][i]);
            }
            System.out.println("#");
        }
        for (int i = 0; i < grid.length + 2; ++i) System.out.print("#");
        System.out.println();
    }

    public static ArrayList<Blocks> make7Bag(){
        ArrayList<Blocks> bag = new ArrayList<Blocks>();
        Blocks x = new Blocks(4, 4);
        bag.add(x.new Piece().LPiece());
        bag.add(x.new Piece().JPiece());
        bag.add(x.new Piece().OPiece());
        bag.add(x.new Piece().SPiece());
        bag.add(x.new Piece().ZPiece());
        bag.add(x.new Piece().IPiece());
        bag.add(x.new Piece().TPiece());
        return bag;
    }

    public static ArrayList<Blocks> make14Bag(){
        ArrayList<Blocks> bag = new ArrayList<Blocks>();
        bag = make7Bag();
        bag.addAll(make7Bag());
        return bag;
    }

    public class Piece{
        static final int DIM = 4;
        private Blocks pc;
        private Piece(){
            pc = new Blocks(DIM, DIM);
        }
        public Blocks LPiece(){
            pc.grid[1][0] = "L";
            pc.grid[1][1] = "L";
            pc.grid[1][2] = "L";
            pc.grid[2][2] = "L";
            return pc;
        }
        public Blocks JPiece(){
            pc.grid[2][0] = "J";
            pc.grid[2][1] = "J";
            pc.grid[2][2] = "J";
            pc.grid[1][2] = "J";
            return pc;
        }
        public Blocks OPiece(){
            pc.grid[0][1] = "O";
            pc.grid[0][2] = "O";
            pc.grid[1][1] = "O";
            pc.grid[1][2] = "O";
            return pc;
        }
        public Blocks SPiece(){
            pc.grid[2][0] = "S";
            pc.grid[3][0] = "S";
            pc.grid[2][1] = "S";
            pc.grid[1][1] = "S";
            return pc;
        }
        public Blocks ZPiece(){
            pc.grid[1][0] = "Z";
            pc.grid[2][0] = "Z";
            pc.grid[2][1] = "Z";
            pc.grid[3][1] = "Z";
            return pc;
        }
        public Blocks IPiece(){
            pc.grid[2][0] = "I";
            pc.grid[2][1] = "I";
            pc.grid[2][2] = "I";
            pc.grid[2][3] = "I";
            return pc;
        }
        public Blocks TPiece(){
            pc.grid[0][1] = "T";
            pc.grid[1][1] = "T";
            pc.grid[1][0] = "T";
            pc.grid[1][2] = "T";
            return pc;
        }
    }
}
