import java.util.*;

class SecondLargest {

    static private int secondLargest(int[] arr, int n) {
        if (n < 2){
            return -1;
        }

        int large = Integer.MIN_VALUE;
        int second_large = Integer.MIN_VALUE;

        for (int i = 0; i < n; i++) {
            if (arr[i] > large) {
                second_large = large;
                large = arr[i];
            }

            else if (arr[i] > second_large && arr[i] != large) {
                second_large = arr[i];
            }
        }

        if (second_large == Integer.MIN_VALUE){
            return -1;
        }

        return second_large;
    }

    public static void main(String[] args) {
        Scanner scn = new Scanner(System.in);
        
        int n = scn.nextInt();
        int arr[] = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = scn.nextInt();
        }

        int secLargest = secondLargest(arr, n);
        System.out.println("Second largest is " + secLargest);

        scn.close();
    }
}
