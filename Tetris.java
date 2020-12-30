import java.util.*;



public class Tetris{
    public static final int WIDTH = 10;
    public static final int HEIGHT = 20;

    private Blocks board;
    private ArrayList<Blocks> bag;
    private boolean canContinuePlaying;
    private boolean sevenBag;
    private int time;

    public Tetris(boolean seven){
        board = new Blocks(WIDTH, HEIGHT);
        sevenBag = seven;
        if (sevenBag) bag = Blocks.make7Bag();
        else bag = Blocks.make14Bag();
        canContinuePlaying = true;
        time = 0;
    }

    public void showGrid(){
        time++;
        board.printGrid();
    }

    public void placePiece(){
        if (bag.isEmpty()){
            if (sevenBag)  bag = Blocks.make7Bag();
            else bag = Blocks.make14Bag();
        }

        int index = (int) (Math.random() * bag.size());
        Blocks temp = bag.get(index);
        bag.remove(index);
        if (placeable(temp)){
            // start on 3 - 4 - 5 - 6 (on 0, 1, 2, 3)
            for (int i = 0; i < 4; ++i){
                for (int j = 0; j < 4; ++j){
                    if (temp.grid[i][j] != " ") board.grid[i + 3][j] = temp.grid[i][j];
                }
            }
        }
        else canContinuePlaying = false;
    }

    private boolean placeable(Blocks b){
        for (int i = 0; i < 4; ++i){
            for (int j = 0; j < 4; ++j){
                if (b.grid[i][j] != " " && board.grid[i + 3][j] != " ") return false;
            }
        }
        return true;
    }





    public static void main(String[] args){
        Tetris play = new Tetris(true);
        while (play.canContinuePlaying && play.time < 5){
            play.showGrid();
            play.placePiece();
        }
    }
}


