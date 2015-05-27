var PayU = {};
(function (ns, tempData) {
    //todo : rather than changing the origin value of data, store the value of data in another variable
    var data = tempData.slice();  // Save a copy of the data passed.
    /**
     *  init : This function is used to initialize the ns level variables and functions
     * */
    var init = function () {
        bindEvents();
        changeToDateType(data);
        displayData(data);
        setSelectionTypes(data);
    };
    /**
     *  bindEvents : This function is used to bind events
     * */
    var bindEvents = function () {
        var isPaymentDesc = false,
            isDateDesc = false,
            isAmountDesc = false,
            selectedStatus = "all";

        // handle click event on payment-id
        document.getElementById("payment-id").addEventListener("click", function () {
            sortData(getFilteredData(data, selectedStatus), "paymentId", isPaymentDesc ? "desc" : "asc");
            isPaymentDesc = !isPaymentDesc;
        }, false);

        // handle click event on orderDate
        document.getElementById("date").addEventListener("click", function () {
            sortData(getFilteredData(data, selectedStatus), "orderDate", isDateDesc ? "desc" : "asc");
            isDateDesc = !isDateDesc;
        }, false);

        // handle click event on amount
        document.getElementById("amount").addEventListener("click", function () {
            sortData(getFilteredData(data, selectedStatus), "amount", isAmountDesc ? "desc" : "asc");
            isAmountDesc = !isAmountDesc;
        }, false);

        // handle click event on payment-status
        document.getElementById("payment-status").addEventListener("change", function () {
            selectedStatus = this.value;
            if (selectedStatus === "all") displayData(data);
            else displayData(getFilteredData(data, selectedStatus));
        }, false);
    };
    /*
     * changeToDateType: This function will convert the orderDate fieled ot date type
     * */
    var changeToDateType = function (array) {
        var date;
        for (var i = 0; i < array.length; i++) {
            date = new Date(array[i].orderDate);
            array[i].orderDate = (date.getMonth() + 1) + "/" + (date.getDate()) + "/" + date.getFullYear();
        }
    };
    /*
     * setSelectionTypes : This function is used to set the options in selectbox
     * */
    var setSelectionTypes = function (array) {
        var tempObj = {}, str = "<option value='all'>All</option> ";
        for (var i = 0; i < dummydata.length; i++) {
            tempObj[dummydata[i].paymentStatus] = "val";
        }
        for (var j in tempObj) {
            str += "<option value='" + j + "'>" + j + "</option>";
        }
        document.getElementsByTagName("select")[0].innerHTML = str;
    };
    /**
     *  displayData : This function takes an array as a param and prints the results in tbody
     * */
    var displayData = function (array) {
        var str = '';
        for (var i = 0; i < array.length; i++) {
            str += '<tr>';
            str += '<td>' + array[i].paymentId + '</td>';
            str += '<td>' + array[i].orderDate + '</td>';
            str += '<td>' + array[i].merchatId + '</td>';
            str += '<td>' + array[i].customerEmail + '</td>';
            str += '<td>' + array[i].amount + '</td>';
            str += '<td>' + array[i].paymentStatus + '</td>';
            str += '</tr>';
        }
        document.getElementsByTagName("tbody")[0].innerHTML = str;
    };
    /**
     *  sortData : This function takes a key as a param, sorts the data and call displayData
     * */
    //todo : implement mergeSort in this
    var sortData = function (array, key, order) {
        for (var i = 0; i < array.length - 1; i++) {
            swap(array, i, getIndex(array, i, key, order))
        }
        /**
         *  getIndex : This function get's the index based on asc/desc condition
         * */
        function getIndex(array, index, key, order) {
            var value = array[index][key],
                tempIndex = index;
            for (var i = index + 1; i < array.length; i++) {
                if (order === "asc" && array[i][key] < value || order === "desc" && array[i][key] > value) {
                    tempIndex = i;
                    value = array[i][key];
                }
            }
            return tempIndex;
        }

        /**
         *  swap : This function swaps the current and next element
         * */
        function swap(array, firstIndex, secondIndex) {
            var temp = array[firstIndex];
            array[firstIndex] = array[secondIndex];
            array[secondIndex] = temp;
        }

        displayData(array);
    };
    /*
     * filterData : This function will filterData based on paymentStatus and display it to the UI
     * */
    var getFilteredData = function (array, filter) {
        var tempArr = [];
        if (filter === "all") {
            tempArr = data;
        } else {
            for (var i = 0; i < array.length; i++) {
                if (array[i].paymentStatus === filter) {
                    tempArr.push(array[i]);
                }
            }
        }
        return tempArr;
    };
    /*
     * pagination : This is the pagination component
     * */
    var pagination = {
        itemsPerPage: 10,
        totalItems: data.length,
        totalPages: 0,
        currentPage: 0,
        lastIndex: 0,
        setPaginationValues: function () {
            this.totalPages = this.totalItems / this.itemsPerPage;
        },
        currentResults: function () {
            var tempArr = [];
            var itemsPerPage = this.itemsPerPage;
            var start = this.currentPage;
            var end = this.itemsPerPage + start ;
            for (var i = start; i < end && i < this.totalItems; i++) {
                tempArr.push(data[[i]]);
            }
            console.log("Start ", start);
            console.log("End ", end);
            console.log("itemsPerPage ", this.itemsPerPage);
            console.log("Array ", tempArr);
            this.currentPage += itemsPerPage;
//            this.lastIndex += this.itemsPerPage;
//            this.itemsPerPage = this.lastIndex * itemsPerPage;
        }
    };
    ns.initApp = init;
    ns.pagination = pagination;
})(PayU, dummydata); // Passed namespace and dummyData to the code

PayU.initApp();